import { getVAMArtworks, getChicArtworks } from "../lib/data/artworks";
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
  shuffle(artworks);
 

  const artworksCol1 =artworks.slice(Math.floor(artworks.length/2)).filter((element)=>element!=null)
  const artworksCol2 =artworks.slice(0, Math.floor(artworks.length/2)).filter((element)=>element!=null)
  // console.log("col1", artworksCol1)
  // console.log("col2", artworksCol2)
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
      <div className="pb-16 sm:pb-4  flex justify-center">
      <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
