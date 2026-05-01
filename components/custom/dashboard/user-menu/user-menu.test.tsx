import { render, screen, fireEvent } from "@testing-library/react"
import { UserMenu } from "./user-menu"
import { useSession, signOut } from "next-auth/react"
import * as React from "react"
import { ReactNode } from "react"
import { userFactory } from "@/test/factories/user-factory"

jest.mock("next-auth/react")
// ... rest of mocks ...
jest.mock("@/components/ui/menubar", () => ({
  Menubar: ({ children }: { children: ReactNode }) => <div data-testid="menubar">{children}</div>,
  MenubarMenu: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  MenubarGroup: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  MenubarTrigger: ({ children, render, ...props }: { children: ReactNode; render?: React.ReactElement }) => {
    if (render) {
      return React.cloneElement(render, props, children)
    }
    return <div {...props}>{children}</div>
  },
  MenubarContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  MenubarItem: ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
    <div onClick={onClick}>{children}</div>
  ),
  MenubarSeparator: () => <hr />,
}))
jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: ReactNode }) => <div data-testid="dropdown-menu">{children}</div>,
  DropdownMenuGroup: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children, render, ...props }: { children: ReactNode; render?: React.ReactElement }) => {
    if (render) {
      return React.cloneElement(render, props, children)
    }
    return <div {...props}>{children}</div>
  },
  DropdownMenuContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DropdownMenuItem: ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
    <div onClick={onClick}>{children}</div>
  ),
  DropdownMenuLabel: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DropdownMenuSeparator: () => <hr />,
}))


describe("UserMenu", () => {
  const mockUser = userFactory.createUser({ name: "John Doe" })

  beforeEach(() => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: { user: mockUser },
      status: "authenticated",
    })
  })


  it("renders user name correctly", () => {
    render(<UserMenu />)
    expect(screen.getAllByText("John Doe").length).toBeGreaterThan(0)
  })

  it("calls signOut when logout button is clicked", () => {
    render(<UserMenu />)
    const logoutButtons = screen.getAllByText(/Sair da Conta/i)
    fireEvent.click(logoutButtons[0])
    expect(signOut).toHaveBeenCalled()
  })

  it("returns null if no session", () => {
    ;(useSession as jest.Mock).mockReturnValue({ data: null })
    const { container } = render(<UserMenu />)
    expect(container.firstChild).toBeNull()
  })
})
