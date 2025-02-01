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
      <div className="sm:pt-16">
        <ArtworksList query="" pageNumber={page} />
      </div>
        {/* <ArtworksDebug query="" pageNumber={page} /> */}
      </Suspense>
    </div>
  );
}
