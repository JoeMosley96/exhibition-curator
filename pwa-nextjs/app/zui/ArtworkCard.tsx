import type { Artwork } from "../lib/data/artworks";
import Link from "next/link";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  // const image = new Image()
  // image.onload = function(){
  //   console.log(artwork.imageURL)
  //   console.log("Height: "+image.height + ", Width: " + image.width)
  // }
  // image.src=artwork.imageURL
  
  return (
    <li>
      <Link href={`/artwork/${artwork.artworkId}`}>
      <img className="w-full" src={artwork.imageURL} alt={artwork.title} />
      </Link>
    </li>
  );
}
