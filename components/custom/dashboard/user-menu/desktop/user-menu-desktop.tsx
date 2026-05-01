"use client"

import { LogOut, User } from "lucide-react"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/string-utils"
import { UserMenuProps } from "../type"

export function UserMenuDesktop({ user, onSignOut }: UserMenuProps) {

  const initials = getInitials(user.name)

  return (

    <Menubar className="border-none bg-transparent shadow-none p-0">
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-3 px-2 py-1.5 cursor-pointer rounded-xl hover:bg-gray-50 transition-colors border-none outline-none focus:bg-gray-50">
          <Avatar className="size-9 border-2 border-white shadow-sm ring-1 ring-gray-100">
            {user.image && <AvatarImage src={user.image} alt={user.name || ""} />}
            <AvatarFallback className="bg-blue-600 text-white text-xs font-black">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start leading-none">
            <span className="text-sm font-bold text-gray-900 truncate max-w-[120px]">
              {user.name}
            </span>
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
              Investidor
            </span>
          </div>
        </MenubarTrigger>
        <MenubarContent align="end" className="w-56 rounded-2xl p-2 shadow-xl border-gray-100 bg-white">
          <div className="flex flex-col px-2 py-2 mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Perfil</span>
            <span className="text-sm font-bold text-gray-900 truncate">{user.name}</span>
            <span className="text-xs text-gray-500 truncate">{user.email}</span>
          </div>
          <MenubarSeparator className="bg-gray-100" />
          <MenubarItem 
            onClick={onSignOut}
            className="rounded-xl py-2 gap-3 cursor-pointer focus:bg-red-50 text-red-600 font-bold"
          >
            <LogOut size={16} />
            <span>Sair da Conta</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

