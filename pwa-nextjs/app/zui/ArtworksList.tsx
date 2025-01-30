import { getVAMArtworks, getChicArtworks, Artwork } from "../lib/data/artworks";
import ArtworkCard from "./ArtworkCard";
import Pagination from "./Pagination";
import { shuffle } from "../utils/utils";


export default async function ArtworksList({
  query,
  pageNumber,
}: {
  query: string;
  pageNumber: number;
}) {

  const [vamArtworks, chicArtworks] = [
    await getVAMArtworks(pageNumber, query),
    await getChicArtworks(pageNumber, query),
  ];
  const artworks = [
    ...(vamArtworks?.artworks || []),
    ...(chicArtworks?.artworks || []),
  ];
  const totalPages = vamArtworks?.pages + chicArtworks?.pages;
  const filteredArtworks = artworks.filter((element)=>element!=null)
  const seen = new Set();
  const uniqueArtworks = filteredArtworks.filter((artwork) => {
    if (seen.has(artwork.artworkId)) {
      return false;
    } else {
      seen.add(artwork.artworkId);
      return true;
    }
  });

  shuffle(uniqueArtworks);

  const artworksCol1:Artwork[] = [];
    const artworksCol2:Artwork[] = [];
    const heights = [0, 0];

    uniqueArtworks.forEach((artwork) => {
      // Simulate image loading and assign to shorter column
      const imageHeight = artwork.imageHeight || 600; // Default height if unknown
      if (heights[0] <= heights[1]) {
        artworksCol1.push(artwork);
        heights[0] += imageHeight;
      } else {
        artworksCol2.push(artwork);
        heights[1] += imageHeight;
      }
    }
    )

  return (
    <div className="flex flex-col sm:pt-20">
      <ul className="flex gap-3 pl-0 ">
        <div className="flex flex-1 flex-col flex-wrap gap-3 items-center ">
        {artworksCol1?.map((artwork) => (
          <ArtworkCard key={artwork.artworkId} artwork={artwork} />
        ))}
        </div>
        <div className="flex flex-1 flex-col flex-wrap gap-3 items-center">
        {artworksCol2?.map((artwork) => (
          <ArtworkCard key={artwork.artworkId} artwork={artwork} />
        ))}
        </div>
      </ul>
      <div className="pb-16 sm:pb-4 pt-10 flex justify-center">
      <Pagination totalPages={totalPages <= 10 ? totalPages : 10} />
      </div>
    </div>
  );
}
