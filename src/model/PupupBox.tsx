"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
const PopupPage = () => {
  const {granted, denied, checked } = useSelector(
    (state: any) => state.location
  );
  if (!checked) return null;
  return (
    <>
      <Dialog open={!granted}>
        <DialogContent className="bg-gradient-to-tl border-none bg-blue-800 shadow-2xs shadow-amber-200">
          <DialogHeader>
            <DialogTitle className="text-white font-bold ">
              📍 Location Required
            </DialogTitle>
            <p className="text-sm mt-2 text-gray-400">
              <i className="font-bold  text-xs block" >Make Sure Internet Connection is open</i>
              Please allow location access to use this feature.
            </p>
            <p className=" text-gray-400">
              Go to  → Site Settings → Location → Allow → Reload page
            </p>
            {denied && <p className="text-red-500 text-xs mt-1">{denied}</p>}
          </DialogHeader>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-green-500 text-xl font-bold cursor-pointer rounded text-white"
          >
            Retry
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default PopupPage;
