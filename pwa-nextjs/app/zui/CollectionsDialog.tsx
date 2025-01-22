"use client";
import {
  addArtworkToExistingCollection,
  Collection,
} from "../lib/data/collections";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";

export default function CollectionsDialog({
  userCollections,
}: {
  userCollections: Collection[];
}) {
  interface IntrinsicElements {
    dialog: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }

  const { artworkId } = useParams<{ artworkId: string }>();

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
          return (
            <li key={collection.collectionInfo.collection_id}>
              <button
                onClick={() => {
                  addArtworkToExistingCollection(
                    collection.collectionInfo.collection_id,
                    artworkId
                  );
                  console.log("clicked")
                }}
                popoverTarget="mypopover"
                popoverTargetAction="hide"
              >
                {collection.collectionInfo.title}
              </button>
              {/* <p>{collection.collectionInfo.description}</p> */}
            </li>
          );
        })}
      </ul>
      <button
        className="w-full bg-blue-600 p-3 rounded-2xl border-none text-white cursor-pointer hover:bg-blue-700"
        popoverTarget="mypopover"
        popoverTargetAction="hide"
      >
        Continue
      </button>
    </dialog>
  );
}
