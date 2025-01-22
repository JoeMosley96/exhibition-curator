"use client";
import React from "react";
import { addArtworkToExistingCollection, getCollectionById } from "../lib/data/collections";


export default function SaveButton({artworkId}:{artworkId:string}) {

  return (
    <>
      <button
      className="w-52 bg-blue-600 p-3 rounded-2xl border-none text-white cursor-pointer hover:bg-blue-700"
      popoverTarget="mypopover"
        onClick={() => {
            addArtworkToExistingCollection(2, artworkId);
            getCollectionById(2)
        }}
        >
        Save
      </button>
      </>
  );
}


