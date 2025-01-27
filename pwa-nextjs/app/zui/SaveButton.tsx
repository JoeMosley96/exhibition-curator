"use client";
import React from "react";
import {
  addArtworkToExistingCollection,
  checkSaved,
  getCollectionById,
  removeArtworkFromCollection,
} from "../lib/data/collections";
import { useRouter } from "next/navigation";

export default function SaveButton({
  setJustRemoved,
  saved,
  artworkId,
  chosenCollection,
  searchParams,
}: {
  setJustRemoved: React.Dispatch<React.SetStateAction<boolean>>;
  saved: boolean;
  artworkId: string;
  chosenCollection: {
    collection_id: number;
    title: string;
    user_id: number;
    description: string;
    created_at: string;
  };
  searchParams: URLSearchParams;
}) {
  const router = useRouter()
  return (
    <>
      {saved ? (
        <button
          className="w-52 bg-black p-3 rounded-2xl border-none text-white cursor-pointer hover:bg-blue-700"
          onClick={async () => {
            const removedResponse = await removeArtworkFromCollection(
              chosenCollection.collection_id,
              artworkId
            );

            if (Array.isArray(removedResponse) && removedResponse.length) {
              setJustRemoved(true);
              router.replace(`${artworkId}`)
            }
          }}
        >
          Saved
        </button>
      ) : (
        <button
          className="w-52 bg-blue-600 p-3 rounded-2xl border-none text-white cursor-pointer hover:bg-blue-700"
          popoverTarget="mypopover"
        >
          Save
        </button>
      )}
    </>
  );
}
