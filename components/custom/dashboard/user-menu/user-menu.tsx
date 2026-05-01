"use client"

import { useSession, signOut } from "next-auth/react"
import { UserMenuDesktop } from "./desktop/user-menu-desktop"
import { UserMenuMobile } from "./mobile/user-menu-mobile"
import { ROUTES } from "@/constants/routes"

export function UserMenu() {
  const { data: session } = useSession()

  if (!session?.user) return null

  const handleSignOut = () => {
    signOut({ callbackUrl: ROUTES.HOME })
  }

  return (
    <>
      <div className="hidden sm:block">
        <UserMenuDesktop user={session.user} onSignOut={handleSignOut} />
      </div>
      <div className="block sm:hidden">
        <UserMenuMobile user={session.user} onSignOut={handleSignOut} />
      </div>
    </>
  )
}
