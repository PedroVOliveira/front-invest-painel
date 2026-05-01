import { render, screen, fireEvent } from "@testing-library/react";
import LoginCard from "./login-card";

// Mock completo do next-auth/react
const mockSignIn = jest.fn();
jest.mock("next-auth/react", () => ({
  signIn: (...args: unknown[]) => mockSignIn(...args),
}));

describe("LoginCard", () => {
  beforeEach(() => {
    mockSignIn.mockClear();
    render(<LoginCard />);
  });

  it("deve renderizar a seção com aria-label de formulário de login", () => {
    expect(
      screen.getByRole("region", { name: /formulário de login/i })
    ).toBeInTheDocument();
  });

  it("deve renderizar o título de boas-vindas", () => {
    expect(screen.getByText(/boas-vindas/i)).toBeInTheDocument();
  });

  it("deve renderizar a descrição do login", () => {
    expect(
      screen.getByText(/entre com sua conta github para acessar o painel/i)
    ).toBeInTheDocument();
  });

  it("deve renderizar o botão de login com GitHub", () => {
    const button = screen.getByRole("button", { name: /entrar com github/i });
    expect(button).toBeInTheDocument();
  });

  it("deve ter id='github-login-btn' no botão", () => {
    const button = screen.getByRole("button", { name: /entrar com github/i });
    expect(button).toHaveAttribute("id", "github-login-btn");
  });

  it("deve ter aria-label no botão de login", () => {
    const button = screen.getByRole("button", { name: /entrar com github/i });
    expect(button).toHaveAttribute("aria-label", "Entrar com GitHub");
  });

  it("deve chamar signIn com provider 'github' e callbackUrl '/dashboard' ao clicar", () => {
    const button = screen.getByRole("button", { name: /entrar com github/i });
    fireEvent.click(button);
    expect(mockSignIn).toHaveBeenCalledTimes(1);
    expect(mockSignIn).toHaveBeenCalledWith("github", {
      callbackUrl: "/dashboard",
    });
  });

  it("deve renderizar o texto de termos de uso", () => {
    expect(screen.getByText(/termos de uso/i)).toBeInTheDocument();
  });
});
