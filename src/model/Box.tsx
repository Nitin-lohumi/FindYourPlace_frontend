import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
function Box({ userName, comment }: { userName: string; comment: string }) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="font-bold cursor-pointer">..more</button>
        </DialogTrigger>
        <DialogContent className="bg-gray-500 border-none">
          <DialogHeader>
            <DialogTitle>{userName || "people"} s' comments</DialogTitle>
            <DialogDescription className="text-white">comment</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-white">{comment}</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button>Close</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Box;
