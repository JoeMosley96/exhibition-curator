import { getArtsyArtworks,  getVAMArtworks } from "../lib/data/artworks";
import type { Artwork } from "../lib/data/artworks";
import { shuffle } from "../utils/utils";
import ArtworkCard from "../zui/ArtworkCard";
import Pagination from "../zui/Pagination";

export default async function Home() {
  const [vamArtworks, artsyArtworks] = [await getVAMArtworks(), await getArtsyArtworks()];
  const artworks: Artwork[] = [...(vamArtworks || []), ...(artsyArtworks || [])];
  shuffle(artworks);
  return (
      <ul className="flex flex-wrap justify-center items-center gap-3 mt-10 p-0 border-2">
        {artworks?.map((artwork) => (
          <ArtworkCard key={artwork.artworkId}  artwork={artwork} />
        ))}
        <Pagination totalPages={2} />
        <br/>
      </ul>
  );
}
