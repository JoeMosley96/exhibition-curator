"use client";
import React from "react";
import { addArtworkToExistingCollection, getCollectionById } from "../lib/data/collections";

export default function SaveButton({artworkId}:{artworkId:string}) {

  return (
      <button
        onClick={() => {
            addArtworkToExistingCollection(2, artworkId);
            getCollectionById(2)
        }}
        >
        Save
      </button>
  );
}


