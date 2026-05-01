import { getInitials } from "./string-utils";

describe("getInitials", () => {
  it("should return initials for a full name", () => {
    expect(getInitials("John Doe")).toBe("JD");
  });

  it("should return first two letters for multiple names", () => {
    expect(getInitials("John Michael Doe")).toBe("JM");
  });

  it("should return single initial for a single name", () => {
    expect(getInitials("John")).toBe("J");
  });

  it("should handle null or undefined", () => {
    expect(getInitials(null)).toBe("U");
    expect(getInitials(undefined)).toBe("U");
  });

  it("should handle empty strings", () => {
    expect(getInitials("")).toBe("U");
    expect(getInitials("   ")).toBe("U");
  });

  it("should handle multiple spaces", () => {
    expect(getInitials("John   Doe")).toBe("JD");
  });

  it("should return uppercase initials", () => {
    expect(getInitials("john doe")).toBe("JD");
  });
});
