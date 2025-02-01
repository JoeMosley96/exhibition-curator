"use client";
import {
  addArtworkToExistingCollection,
  Collection,
  deleteCollection,
} from "../lib/data/collections";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
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
  const [collectionsList, setCollectionsList] = useState(userCollections);
  const [deletePressedArr, setDeletePressedArr] = useState(
    new Array(userCollections.length).fill(false)
  );

  // useEffect(()=>{

  // },[collectionsList])

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
            {collectionsList.map((collection, i) => {
              const collectionId = collection.collectionInfo.collection_id;
              const collectionTitle = collection.collectionInfo.title;
              const collectionThumbnail =
                collection.collectionArtworks[0]?.thumbnailURL;
              return (
                <li key={collectionId}>
                  <div className="flex justify-between items-center ">
                    <button
                      className="flex h-14 items-center gap-4 shrink"
                      onClick={async () => {
                        const addedArtwork =
                          await addArtworkToExistingCollection(
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
                      <div className=" text-leftk">
                        <p
                          className={`whitespace-nowrap overflow-hidden ${
                            deletePressedArr[i] && "max-w-44 sm:max-w-full"
                          } ${collectionThumbnail ? "" : "pl-14"}`}
                        >
                          {collectionTitle}
                        </p>
                      </div>
                    </button>
                    <div className="flex items-center gap-1">
                      {deletePressedArr[i] && (
                        <button
                          className="btn btn-error h-3"
                          onClick={async () => {
                            const deletedResponse = await deleteCollection(collectionId);
                            deletedResponse && setCollectionsList(collectionsList.toSpliced(i, 1));
                            const deletePressedArrCopy = [...deletePressedArr];
                            deletePressedArrCopy[i] = !deletePressedArrCopy[i];
                            setDeletePressedArr(deletePressedArrCopy);
                          }}
                        >
                          Delete
                        </button>
                      )}
                      <button
                        onClick={() => {
                          const deletePressedArrCopy = [...deletePressedArr];
                          deletePressedArrCopy[i] = !deletePressedArrCopy[i];
                          setDeletePressedArr(deletePressedArrCopy);
                        }}
                        className={
                          deletePressedArr[i]
                            ? "btn btn-success"
                            : "btn btn-sm btn-circle btn-ghost"
                        }
                      >
                        {deletePressedArr[i] ? (
                          <p>Keep</p>
                        ) : (
                          <FontAwesomeIcon icon={faTrashCan} />
                        )}
                      </button>
                    </div>
                  </div>
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
