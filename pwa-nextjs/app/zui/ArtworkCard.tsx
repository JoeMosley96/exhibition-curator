import type { Artwork } from "../lib/data/artworks";
import Link from "next/link";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <li className="w-5/12 ">
      <Link href={`/artwork/${artwork.artworkId}`}>
      <img className="w-full" src={artwork.imageURL} alt={artwork.title} />
      </Link>
    </li>
  );
}
