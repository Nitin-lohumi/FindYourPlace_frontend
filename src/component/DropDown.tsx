"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
export default function DropDown() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="p-1 focus:outline-none cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <HiOutlineMenuAlt3 size={24} /> : <IoMenu size={24} />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 mt-2 mr-1 border-none shadow shadow-gray-700 backgroundColor ">
        <DropdownMenuSeparator color={"white"} />
        <DropdownMenuItem
          className={`cursor-pointer text-lg hover:bg-sky-700 text-gray-100 font-bold `}
        >
          <Link href={"/#hotel"}>Hotel</Link>
        </DropdownMenuItem>
        <hr className="text-gray-700" />
        <DropdownMenuItem
          className={`cursor-pointer text-lg hover:bg-sky-700 text-gray-100 font-bold `}
        >
          <Link href={"/#shopping_mall"}>shopping mall</Link>
        </DropdownMenuItem>
        <hr className="text-gray-700" />
        {session && (
          <DropdownMenuItem
            className={`cursor-pointer text-lg hover:bg-sky-700 text-gray-100 font-bold`}
          >
            <Link href={"/profile"}>profile</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
