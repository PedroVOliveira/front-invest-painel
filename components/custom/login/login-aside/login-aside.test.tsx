import { render, screen } from "@testing-library/react";
import LoginAside from "./login-aside";

describe("LoginAside", () => {
  beforeEach(() => {
    render(<LoginAside />);
  });

  it("deve renderizar o nome da marca", () => {
    expect(screen.getByText("Verity Invest")).toBeInTheDocument();
  });

  it("deve ter aria-label no elemento aside", () => {
    expect(
      screen.getByRole("complementary", {
        name: /informações da plataforma/i,
      })
    ).toBeInTheDocument();
  });

  it("deve renderizar o título principal da seção", () => {
    expect(
      screen.getByRole("heading", {
        name: /gerencie seus ativos com inteligência/i,
      })
    ).toBeInTheDocument();
  });

  it("deve listar as 3 funcionalidades da plataforma", () => {
    const list = screen.getByRole("list", {
      name: /funcionalidades da plataforma/i,
    });
    const items = list.querySelectorAll("li");
    expect(items).toHaveLength(3);
  });

  it("deve exibir cada funcionalidade como texto acessível", () => {
    expect(
      screen.getByText(/cotações em tempo real via brapi/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/autenticação segura com github sso/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/análise e acompanhamento de portfólio/i)
    ).toBeInTheDocument();
  });

  it("deve exibir o texto de copyright com o ano atual", () => {
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
