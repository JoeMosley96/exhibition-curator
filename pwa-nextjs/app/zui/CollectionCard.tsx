import Image from "next/image";
import { Collection } from "../lib/data/collections";
import Link from "next/link";

export default function CollectionCard({
  collection,
}: {
  collection: Collection;
}) {
  const collectionLength = collection.collectionArtworks.length;
  const truncatedArtworksList = collection.collectionArtworks.slice(0,3)
  return (
    <Link href={`/collection/${collection.collectionInfo.collection_id}`}>
    <div
      key={collection.collectionInfo.collection_id}
      className="card bg-base-100 w-96 shadow-xl"
    >
      <figure>
        <div className={`grid grid-cols-${collectionLength * 2} h-44`}>
          {truncatedArtworksList.map((artwork, i) => {
            return (
              <div
                className={`row-span-full col-start${i + 1} col-span-2 `}
                key={artwork?.artworkId || i}
              >
                <Image
                  className="object-cover aspect-[2/3] "
                  src={artwork?.thumbnailURL || "../../public/Image-not-found.png"}
                  alt="artwork image"
                  width={300}
                  height={300}
                />
              </div>
            );
          })}
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{collection.collectionInfo.title}</h2>
        <p>{collection.collectionInfo.description}</p>
        {/* <div className="card-actions justify-end">
  
         
        </div> */}
      </div>
    </div>
    </Link>
  );
}
