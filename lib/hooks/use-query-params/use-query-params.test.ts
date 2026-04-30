import { renderHook, act } from "@testing-library/react";
import { useQueryParams } from "./use-query-params";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("useQueryParams", () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    jest.clearAllMocks();
  });

  it("getQueryParam returns value from URL", () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams("search=PETR4"));

    const { result } = renderHook(() => useQueryParams());
    expect(result.current.getQueryParam("search")).toBe("PETR4");
  });

  it("getQueryParam returns empty string if not present", () => {
    const { result } = renderHook(() => useQueryParams());
    expect(result.current.getQueryParam("search")).toBe("");
  });

  it("setQueryParam updates the URL if value is different", () => {
    const { result } = renderHook(() => useQueryParams());

    act(() => {
      result.current.setQueryParam("search", "PETR4");
    });

    expect(mockReplace).toHaveBeenCalledWith("?search=PETR4", { scroll: false });
  });

  it("setQueryParam does not update the URL if value is the same", () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams("search=PETR4"));
    const { result } = renderHook(() => useQueryParams());

    act(() => {
      result.current.setQueryParam("search", "PETR4");
    });

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("setQueryParam removes the parameter if value is empty", () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams("search=PETR4"));
    const { result } = renderHook(() => useQueryParams());

    act(() => {
      result.current.setQueryParam("search", "");
    });

    expect(mockReplace).toHaveBeenCalledWith("?", { scroll: false });
  });
});
