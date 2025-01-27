import Search from "../zui/Search";
import { Suspense } from "react";
import ArtworksList from "../zui/ArtworksList";
import CollectionsList from "../zui/CollectionsList";
import Spinner from "../zui/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import FilterButton from "../zui/FilterButton";
import FilterDialog from "../zui/FilterDialog";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    filter?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const filter = searchParams?.filter
  const pageNumber = Number(searchParams?.page) || 1;

  return (
    <div>
      <div className="mb-10">
        <Search />
      </div>
      {query.length ? (
        <Suspense fallback={<Spinner />}>
          <FilterButton/>
          <FilterDialog/>
          {filter==="artworks" && <ArtworksList query={query} pageNumber={pageNumber} />}
          {filter==="collections" && <CollectionsList query={query} pageNumber={pageNumber} />}
        </Suspense>
      ) : (
        <h1>Put collections here</h1>
      )}
    </div>
  );
}
