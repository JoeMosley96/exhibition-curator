import { getVAMArtworks, getChicArtworks } from "../lib/data/artworks";
import type { Artwork } from "../lib/data/artworks";
import { shuffle } from "../utils/utils";
import ArtworksList from "../zui/ArtworksList";
import { Suspense } from "react";
import Pagination from "../zui/Pagination";
import { useSearchParams, usePathname } from "next/navigation";
import Spinner from "../zui/spinner/Spinner";

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
