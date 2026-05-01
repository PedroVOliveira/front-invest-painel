import { createClient } from "@libsql/client";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN");
  process.exit(1);
}

const client = createClient({ url, authToken });

async function deploy() {
  try {
    const migrationsDir = path.join(process.cwd(), "prisma/migrations");
    const folders = fs.readdirSync(migrationsDir).filter(f => fs.statSync(path.join(migrationsDir, f)).isDirectory());
    
    // Sort migrations by name
    folders.sort();

    // Check if _prisma_migrations table exists
    await client.execute(`
      CREATE TABLE IF NOT EXISTS _prisma_migrations (
        id VARCHAR(36) PRIMARY KEY NOT NULL,
        checksum VARCHAR(64) NOT NULL,
        finished_at DATETIME,
        migration_name VARCHAR(255) NOT NULL,
        logs TEXT,
        rolled_back_at DATETIME,
        started_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        applied_steps_count INTEGER UNSIGNED NOT NULL DEFAULT 0
      );
    `);

    const { rows } = await client.execute("SELECT migration_name FROM _prisma_migrations");
    const applied = new Set(rows.map(r => r.migration_name));

    for (const folder of folders) {
      if (!applied.has(folder)) {
        console.log(`Applying migration: ${folder}`);
        const sqlPath = path.join(migrationsDir, folder, "migration.sql");
        const sql = fs.readFileSync(sqlPath, "utf-8");
        
        // Execute SQL logic (split by statements if necessary, but Turso supports batch or multi-statement execute)
        await client.executeMultiple(sql);
        
        // Insert into _prisma_migrations
        await client.execute({
          sql: `INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, applied_steps_count) VALUES (?, ?, CURRENT_TIMESTAMP, ?, 1)`,
          args: [crypto.randomUUID(), "manual", folder]
        });
        
        console.log(`Migration ${folder} applied successfully.`);
      }
    }
    
    console.log("All migrations applied to Turso.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

deploy();
