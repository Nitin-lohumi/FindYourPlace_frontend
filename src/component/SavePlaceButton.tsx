"use client";
import { BsSave2, BsSave2Fill } from "react-icons/bs";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
function SavePlaceButton({ placeData }: { placeData: any }) {
  const search = useSearchParams();
  const queryClient = useQueryClient();
  const userId = search.get("id");
  const placeId = placeData?.id;
  const isSavedQuery = useQuery({
    queryKey: ["isSaved", userId, placeId],
    queryFn: async () => {
      const res = await axios.post(
        "https://findyourplace-backend.onrender.com/save/check/isSaved",
        { userId, placeId },
        { withCredentials: true }
      );

      return res.data?.Save ?? false;
    },
    enabled: !!userId && !!placeId,
    staleTime: 1 * 60 * 1000,
  });

  const saveMutation = useMutation({
    mutationFn: async () =>
      axios.post(
        "https://findyourplace-backend.onrender.com/save/data",
        { SaveObject: placeData, userId },
        { withCredentials: true }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPlaces", userId] });
      isSavedQuery.refetch();
      toast.success("Place saved successfully!");
    },
    onError: () => {
      toast.error("Failed to save place. Please try again.");
    },
  });

  const removeMutation = useMutation({
    mutationFn: async () => {
      if (!placeId || !userId) throw new Error("Missing IDs");
      return axios.delete(
        `https://findyourplace-backend.onrender.com/save/RemoveFromSave/${placeId}/${userId}`,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPlaces", userId] });
      isSavedQuery.refetch();
      toast.success("Place removed successfully!");
    },
    onError: (error) => {
      toast.error("Failed to remove place. Please try again.");
      console.error("Error removing place:", error);
    },
  });
  const handleSave = () => saveMutation.mutate();
  const handleRemove = () => removeMutation.mutate();
  if (isSavedQuery.isLoading) return <p className="text-white">**</p>;
  return (
    <>
      {!isSavedQuery.data ? (
        <button
          onClick={handleSave}
          disabled={saveMutation.isPending}
          className="text-blue-600 hover:text-blue-800  pr-2 transition-all cursor-pointer"
        >
          <BsSave2 color="white" />
        </button>
      ) : (
        <div className="flex item-center flex-col gap-1">
          <button
            onClick={handleRemove}
            disabled={removeMutation.isPending}
            className="text-blue-600 hover:text-blue-800 pr-2 transition-all cursor-pointer flex flex-col item-center gap-2"
          >
            <BsSave2Fill color="white" className="text-center" />
          </button>
          <i className="block text-xs">saved</i>
        </div>
      )}
    </>
  );
}

export default SavePlaceButton;
