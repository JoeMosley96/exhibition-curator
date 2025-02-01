import Search from "../zui/Search";
import { Suspense } from "react";
import ArtworksList from "../zui/ArtworksList";
import CollectionsList from "../zui/CollectionsList";
import UsersList from "../zui/UsersList";
import Spinner from "../zui/Spinner";
import FilterButton from "../zui/FilterButton";
import FilterDialog from "../zui/FilterDialog";
import EmbeddedSearch from "../zui/EmbeddedSearch";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    filter?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const filter = searchParams?.filter;
  const pageNumber = Number(searchParams?.page) || 1;

  return (
    <div>
      <div className="mb-5 mt-5 mx-auto sm:hidden">
        <EmbeddedSearch />
      </div>
      {query.length ? (
        <Suspense
          key={`${searchParams?.page}-${searchParams?.query}-${searchParams?.filter}`}
          fallback={<Spinner />}
        >
          <div className="sm:ml-5 sm:mt-20">
            <FilterButton />
          </div>
          <FilterDialog />
          <div className="pb-8 pt-5">
            {filter === "artworks" && (
              <ArtworksList query={query} pageNumber={pageNumber} />
            )}
            {filter === "collections" && (
              <CollectionsList query={query} pageNumber={pageNumber} />
            )}
            {filter === "profiles" && (
              <UsersList query={query} pageNumber={pageNumber} />
            )}
          </div>
        </Suspense>
      ) : (
        <h1>Put collections here</h1>
      )}
    </div>
  );
}
