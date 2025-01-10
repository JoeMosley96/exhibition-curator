import { getArtworkById, getArtworks } from "../lib/data/artworks";
import type { Artwork } from "../lib/data/artworks";
import ArtworkCard from "../zui/ArtworkCard";

export default async function Home() {
  const artworks = await getArtworks();
  return (
      <ul className="flex flex-column flex-wrap-reverse justify-left items-center gap-3 mt-10 p-0 border-2 h-[85rem]">
        {artworks?.map((artwork) => (
          <ArtworkCard artwork={artwork} />
        ))}
      </ul>
  );
}
