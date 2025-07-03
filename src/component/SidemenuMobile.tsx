import React from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import LayOutComp from "@/app/search/Searchcomponent/LayOutComp";
import { FaFilter } from "react-icons/fa6";
function SidemenuMobile() {
  return (
    <>
      <Drawer direction={"left"}>
        <DrawerTrigger asChild>
          <FaFilter className="shadow-max text-gray-950/100 z-0" size={40}/>
        </DrawerTrigger>
        <DrawerContent className="p-1 w-[80%] max-w-sm overflow-y-scroll bg-blue-950/80">
          <DrawerHeader>
            <DrawerTitle>Filter's</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="space-y-2">
            <LayOutComp />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SidemenuMobile;
