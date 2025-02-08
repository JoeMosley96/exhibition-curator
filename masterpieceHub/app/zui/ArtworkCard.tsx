import type { Artwork } from "../lib/data/artworks";
import Link from "next/link";
import IKImageClient from "./IKImageClient";


export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <li className="max-w-7xl ">
      <Link href={`/artwork/${artwork.artworkId}`}>
        <IKImageClient
          width={500}
          height={300}
          className="w-full sm:rounded-md"
          src={artwork.thumbnailURL || artwork.imageURL}
          alt={artwork.title}
        />
      </Link>
    </li>
  );
}
