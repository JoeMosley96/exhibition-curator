import { getCollectionsBySearch } from "../lib/data/collections";

export default async function CollectionsList({
  query,
  pageNumber,
}: {
  query: string;
  pageNumber: number;
}) {
  const collections = await getCollectionsBySearch(pageNumber, query);
    return collections?.map((collection) => {
      return <p key={collection?.collectionInfo.collection_id}>{collection?.collectionInfo.title}</p>;
    });
  
}
