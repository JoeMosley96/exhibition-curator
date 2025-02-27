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
  const filteredArtworks = artworks.filter((element) => element !== null && element !== undefined);
  const seen = new Set();
  const uniqueArtworks = filteredArtworks.filter((artwork) => {
    if (seen.has(artwork.artworkId)) {
      return false;
    } else {
      seen.add(artwork.artworkId);
      return true;
    }
  });

  if(uniqueArtworks.length){

    
    shuffle(uniqueArtworks);
    
  const artworksCol1: Artwork[] = [];
  const artworksCol2: Artwork[] = [];
  const heights = [0, 0];
  
  uniqueArtworks.forEach((artwork) => {
    // Simulate image loading and assign to shorter column
    const imageHeightRatio = artwork.imageHeight / artwork.imageWidth // Default height if unknown
    if (heights[0] <= heights[1]) {
      artworksCol1.push(artwork);
      heights[0] += imageHeightRatio;
    } else {
      artworksCol2.push(artwork);
      heights[1] += imageHeightRatio;
    }
  });

  return (
    <div className="flex flex-col">
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
      {totalPages > 1 && (
        <div className="pb-20 sm:pb-4 pt-10 flex justify-center">
          <Pagination totalPages={totalPages <= 10 ? totalPages : 10} />
        </div>
      )}
    </div>
  );
} else{
  return (
    <div className="flex justify-center items-center">
      <p>{`No artworks found for the search term "${query}"`}</p>
    </div>
  );
}
}
