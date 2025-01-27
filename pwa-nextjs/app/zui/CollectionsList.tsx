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
      return <p>{collection?.collectionInfo.title}</p>;
    });
  
}
