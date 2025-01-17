import { getArtsyArtworks,  getVAMArtworks } from "../lib/data/artworks";
import type { Artwork } from "../lib/data/artworks";
import { shuffle } from "../utils/utils";
import ArtworkCard from "../zui/ArtworkCard";
import Pagination from "../zui/Pagination";
import {useSearchParams, usePathname} from "next/navigation"

export default async function Home(props: {
  searchParams?: Promise<{
    page: string
  }>;
}) {
  const searchParams = await props.searchParams
  const page = Number(searchParams?.page) || 1

  const [vamArtworks, artsyArtworks] = [await getVAMArtworks(page, ""), await getArtsyArtworks(page, "")];
 
  const artworks: Artwork[] = [...(vamArtworks?.artworks ?? []), ...(artsyArtworks?.artworks ?? [])];
  shuffle(artworks);
  return (
      <ul className="flex flex-wrap justify-center items-center gap-3 mt-10 pl-0 pb-16 border-2">
        {artworks?.map((artwork) => (
          <ArtworkCard key={artwork.artworkId}  artwork={artwork} />
          
        ))}
        <Pagination totalPages={10} />
        <br/>
      </ul>
  );
}
