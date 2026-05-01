import { getRequiredEnv } from "./env";

describe("getRequiredEnv", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should return the environment variable value if it exists", () => {
    process.env.TEST_VAR = "test-value";
    expect(getRequiredEnv("TEST_VAR")).toBe("test-value");
  });

  it("should throw an error if the environment variable is not defined", () => {
    delete process.env.TEST_VAR;
    expect(() => getRequiredEnv("TEST_VAR")).toThrow("TEST_VAR is not defined");
  });
});
