import ArtworksList from "../zui/ArtworksList";
import { Suspense } from "react";
import Spinner from "../zui/Spinner";
import { getCollectionById } from "../lib/data/collections";

export default async function Home(props: {
  searchParams?: Promise<{
    page: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;

  return (
    <div>
      <Suspense key={`${searchParams?.page}`} fallback={<Spinner />}>
        <ArtworksList query="" pageNumber={page} />
        {/* <ArtworksDebug query="" pageNumber={page} /> */}
      </Suspense>
    </div>
  );
}
