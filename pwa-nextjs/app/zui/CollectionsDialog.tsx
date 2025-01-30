"use client";
import {
  addArtworkToExistingCollection,
  Collection,
} from "../lib/data/collections";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getChicArtworkById, getVAMArtworkById } from "../lib/data/artworks";

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
  const { artworkId } = useParams<{ artworkId: string }>();

  return (
    <dialog
      id="collectionsDialog"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <button
          onClick={() => {
            (
              document.getElementById("collectionsDialog") as HTMLDialogElement
            )?.close();
          }}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>

        <h1 className="font-bold text-lg">Add to Collection</h1>
        <div className="flex flex-col modal-action border-t-2 mt-3 pt-3">
          <ul>
            {userCollections.map((collection) => {
              const collectionId = collection.collectionInfo.collection_id;
              const collectionTitle = collection.collectionInfo.title;
              const collectionThumbnail =
                collection.collectionArtworks[0]?.thumbnailURL;
              return (
                <li key={collectionId}>
                  <button
                    className="flex h-14 items-center gap-4"
                    onClick={async () => {
                      const addedArtwork = await addArtworkToExistingCollection(
                        collectionId,
                        artworkId
                      );
                      if (addedArtwork && addedArtwork.length) {
                        setJustAdded(true);
                        setChosenCollection(collection.collectionInfo);
                        (
                          document.getElementById(
                            "collectionsDialog"
                          ) as HTMLDialogElement
                        )?.close();
                      }
                    }}
                  >
                    {collectionThumbnail && (
                      <div className="w-10 h-10">
                        <Image
                          className="object-cover aspect-square rounded-lg"
                          alt="Collction thumbnail"
                          src={collectionThumbnail}
                          height={50}
                          width={50}
                        />
                      </div>
                    )}
                    <p className={collectionThumbnail ? "" : "pl-14"}>{collectionTitle}</p>
                  </button>
                </li>
              );
            })}
          </ul>
          <Link href={`/create/${artworkId}`}>
            <button
              className="btn btn-neutral w-[50%] ml-[25%]"
              popoverTarget="mypopover"
              popoverTargetAction="hide"
            >
              Create New
            </button>
          </Link>
        </div>
      </div>
    </dialog>
  );
}
