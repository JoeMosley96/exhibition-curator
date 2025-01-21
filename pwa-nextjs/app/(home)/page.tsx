import ArtworksList from "../zui/ArtworksList";
import { Suspense } from "react";
import Spinner from "../zui/Spinner";

export default async function Home(props: {
  searchParams?: Promise<{
    page: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <ArtworksList query="" pageNumber={page} />
      </Suspense>
    </div>
  );
}
