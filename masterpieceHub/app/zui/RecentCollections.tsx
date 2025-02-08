import { fetchLatestCollections } from "../lib/data/collections";
import Image from "next/image";
import Link from "next/link";

export default async function RecentCollections() {
  const latestCollections = await fetchLatestCollections();
  return (
    <>
    <article className="prose">

      <h2 className="mx-auto text-center mb-8">Browse New Collections:</h2>
    </article>
      <div className="carousel">
        {latestCollections?.map((collection) => {
          return (
            <div className="carousel-item relative" key={collection.collectionInfo.collection_id}>
              <Link
                href={`/collection/${collection.collectionInfo.collection_id}`}
              >
                <Image
                  className="object-cover aspect-[2/3]"
                  width={400}
                  height={400}
                  src={collection.collectionArtworks[0].thumbnailURL}
                  alt="Burger"
                  unoptimized
                />
                {/* <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div> */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-white text-3xl font-bold">
                    {collection.collectionInfo.title}
                  </h2>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
