"use client";
import { Artwork } from "../lib/data/artworks";
import ArtworkCard from "./ArtworkCard";
import React, { useState } from "react";
import { Collection, deleteCollection } from "../lib/data/collections";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { revalidatePath } from "next/cache";

export default function FullCollection({
  collection,
  username,
}: {
  collection: Collection;
  username: string;
}) {
  const [deletePressed, setDeletePressed] = useState(false);
  const router = useRouter();

  const artworksCol1: Artwork[] = [];
  const artworksCol2: Artwork[] = [];
  const heights = [0, 0];

  collection.collectionArtworks.forEach((artwork) => {
    // Simulate image loading and assign to shorter column
    const imageHeight = artwork.imageHeight || 600; // Default height if unknown
    if (heights[0] <= heights[1]) {
      artworksCol1.push(artwork);
      heights[0] += imageHeight;
    } else {
      artworksCol2.push(artwork);
      heights[1] += imageHeight;
    }
  });
  return (
    <>
      <div className="flex flex-col sm:pb-0 pb-20">
        {username === "artlover1" && (
          <div className="flex items-center mx-auto gap-1">
            {deletePressed && (
              <button
                className="btn btn-error h-3"
                onClick={async () => {
                  const deletedResponse = await deleteCollection(
                    collection.collectionInfo.collection_id
                  );
                  if (deletedResponse) {
                    router.back();
                    setTimeout(() => {
                      router.refresh();
                    }, 200);
                  }
                }}
              >
                Delete
              </button>
            )}
            <button
              onClick={() => {
                setDeletePressed(!deletePressed);
              }}
              className={
                deletePressed ? "btn btn-success" : "btn btn-sm btn-ghost"
              }
            >
              {deletePressed ? (
                <p>Keep</p>
              ) : (
                <div className="flex gap-3">
                  <p>Delete</p>
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              )}
            </button>
          </div>
        )}
        <ul className="flex gap-3 pl-0 ">
          <div className="flex flex-1 flex-col flex-wrap gap-3 items-center ">
            {artworksCol1?.map((artwork) => (
              <ArtworkCard key={artwork.artworkId} artwork={artwork} />
            ))}
          </div>
          <div className="flex flex-1 flex-col flex-wrap gap-3 items-center">
            {artworksCol2?.map((artwork) => (
              <ArtworkCard key={artwork.artworkId} artwork={artwork} />
            ))}
          </div>
        </ul>
      </div>
    </>
  );
}
