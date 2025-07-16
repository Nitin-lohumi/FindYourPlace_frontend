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
import { useRouter } from "next/navigation";

export default function DropDown() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };
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

      <DropdownMenuContent className="w-60 mt-2 mr-1 border-none shadow shadow-gray-700 backgroundColor">
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => handleNavigate("/#hotel")}
          className="cursor-pointer text-lg hover:bg-sky-700 text-gray-100 font-bold"
        >
          Hotel
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleNavigate("/#shopping_mall")}
          className="cursor-pointer text-lg hover:bg-sky-700 text-gray-100 font-bold"
        >
          Shopping Mall
        </DropdownMenuItem>

        {session && (
          <DropdownMenuItem
            onClick={() => handleNavigate("/profile")}
            className="cursor-pointer text-lg hover:bg-sky-700 text-gray-100 font-bold"
          >
            Profile
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
