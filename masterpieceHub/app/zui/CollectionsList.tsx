import { getCollectionsBySearch } from "../lib/data/collections";
import CollectionCard from "./CollectionCard";
import Pagination from "./Pagination";

export default async function CollectionsList({
  query,
  pageNumber,
}: {
  query: string;
  pageNumber: number;
}) {
  let totalPages;
  const collections = await getCollectionsBySearch(pageNumber, query);
  if (collections?.length) {
    totalPages = Math.ceil(collections.length / 20);
    const filteredCollections = collections.filter(
      (collection) => collection !== undefined
    );
    return (
      <>
        <div className="flex flex-wrap gap-3 justify-center pb-10">
          {filteredCollections.map((collection) => {
            return (
              <CollectionCard
                key={collection?.collectionInfo.collection_id}
                collection={collection}
              />
            );
          })}
          ;
        </div>
        {totalPages > 1 && (
          <div className="pb-14 sm:pb-4 pt-10 flex justify-center">
            <Pagination totalPages={totalPages <= 10 ? totalPages : 10} />
          </div>
        )}
      </>
    );
  } else {
    return (
      <div className="flex justify-center items-center">
        <p>{`No collections found for the search term "${query}"`}</p>
      </div>
    );
  }
}
