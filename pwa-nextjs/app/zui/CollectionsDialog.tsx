"use client";
import {
  addArtworkToExistingCollection,
  Collection,
  getCollectionById,
} from "../lib/data/collections";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function CollectionsDialog({
  userCollections,
  setJustAdded,
  setChosenCollection,
}: {
  userCollections: Collection[];
  setJustAdded: React.Dispatch<React.SetStateAction<boolean>>;
  setChosenCollection: React.Dispatch<
    React.SetStateAction<{
      collection_id: number;
      title: string;
      user_id: number;
      description: string;
      created_at: string;
    }>
  >;
}) {
  interface IntrinsicElements {
    dialog: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }

  const { artworkId } = useParams<{ artworkId: string }>();
  const [popover, setPopover] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPopover(document.getElementById("mypopover"));
  }, []);

  return (
    <dialog
      id="mypopover"
      className="border-none p-8 rounded-2xl w-full sm:max-w-xl"
      popover="manual"
    >
      <button
        className="bg-none border-none float-right cursor-pointer"
        popoverTarget="mypopover"
        popoverTargetAction="hide"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <h4 className="mt-0">Add to Collection</h4>
      <ul>
        {userCollections.map((collection) => {
          const collectionId = collection.collectionInfo.collection_id;
          const collectionTitle = collection.collectionInfo.title;
          return (
            <li key={collectionId}>
              <button
                onClick={async (event) => {
                  const addedArtwork = await addArtworkToExistingCollection(
                    collectionId,
                    artworkId
                  );
                  if ((addedArtwork as any[]).length) {
                    setJustAdded(true);
                    setChosenCollection(collection.collectionInfo);
                    popover?.hidePopover();
                  }
                }}
              >
                {collectionTitle}
              </button>
              {/* <p>{collection.collectionInfo.description}</p> */}
            </li>
          );
        })}
      </ul>
      <Link
      href={`/create/${artworkId}`}>
        <button
          className="w-full bg-blue-600 p-3 rounded-2xl border-none text-white cursor-pointer hover:bg-blue-700"
          popoverTarget="mypopover"
          popoverTargetAction="hide"
        >
          Create New Collection
        </button>
      </Link>
    </dialog>
  );
}
