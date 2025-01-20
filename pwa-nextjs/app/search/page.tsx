import Search from "../zui/Search";
import { Suspense } from "react";
import { getChicArtworks, getVAMArtworks } from "../lib/data/artworks";
import ArtworksList from "../zui/ArtworksList";
import Pagination from "../zui/Pagination";
import Spinner from "../zui/spinner/Spinner";

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
      <Search />
      {query.length ? (
      <Suspense fallback={<Spinner/>}>
        <ArtworksList query={query} pageNumber={pageNumber} />
      </Suspense>
      ) :
      <h1>Put collections here</h1>}
    </div>
  );
}

