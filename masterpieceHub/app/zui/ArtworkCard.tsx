import Image from "next/image";
import type { Artwork } from "../lib/data/artworks";
import Link from "next/link";

export default function ArtworkCard({ artwork, }: { artwork: Artwork}) {
  return (
    <li className="max-w-7xl ">
      <Link href={`/artwork/${artwork.artworkId}`}>
      <Image  width={500} height={300} className="w-full sm:rounded-md" placeholder="blur" blurDataURL={artwork.thumbnailURL || artwork.imageURL}src={artwork.thumbnailURL || artwork.imageURL} loading="lazy" alt={artwork.title} unoptimized/>
      </Link>
    </li>
  );
}
