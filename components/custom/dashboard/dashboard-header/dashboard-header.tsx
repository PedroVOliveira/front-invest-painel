export default function DashboardHeader() {
  return (
    <header
      role="banner"
      className="flex items-center justify-between border-b border-gray-100 px-6 py-4"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard de Investimentos
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Área logada para gestão de ativos.
        </p>
      </div>
    </header>
  );
}
