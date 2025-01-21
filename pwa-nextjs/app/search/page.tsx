import Search from "../zui/Search";
import { Suspense } from "react";
import ArtworksList from "../zui/ArtworksList";
import Spinner from "../zui/Spinner";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const pageNumber = Number(searchParams?.page) || 1;

  return (
    <div>
      <div className="mb-10">
        <Search />
      </div>
      {query.length ? (
        <Suspense fallback={<Spinner />}>
          <ArtworksList query={query} pageNumber={pageNumber} />
        </Suspense>
      ) : (
        <h1>Put collections here</h1>
      )}
    </div>
  );
}
