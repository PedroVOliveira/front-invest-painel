"use client"

import { Menu, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserMenuProps } from "../type"
import { getInitials } from "@/lib/string-utils"

export function UserMenuMobile({ user, onSignOut }: UserMenuProps) {
  const initials = getInitials(user.name)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-xl bg-gray-50 text-gray-900 border border-gray-100" />}>
        <Menu size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[calc(100vw-2rem)] mt-2 rounded-2xl p-3 shadow-2xl border-gray-100 bg-white">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-3">
            <div className="flex items-center gap-4">
              <Avatar className="size-12 border-2 border-white shadow-sm ring-1 ring-gray-100">
                {user.image && <AvatarImage src={user.image} alt={user.name || ""} />}
                <AvatarFallback className="bg-blue-600 text-white text-lg font-black">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-base font-black text-gray-900">{user.name}</span>
                <span className="text-xs font-medium text-gray-500">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-2 bg-gray-100" />
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator className="bg-gray-50" />
        
        <DropdownMenuGroup>
          <DropdownMenuItem 
            onClick={onSignOut}
            className="rounded-xl py-3 px-4 gap-3 cursor-pointer focus:bg-red-50 text-red-600 font-black"
          >
            <LogOut size={18} />
            <span>Sair da Conta</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
