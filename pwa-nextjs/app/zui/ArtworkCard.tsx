import type { Artwork } from "../lib/data/artworks";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <li className="w-5/12">
      <img className="w-full" src={artwork.imageURL} alt={artwork.title} />
      {/* <div className="card-body">
                <h5 className="card-title">{artwork.title}</h5>
                <p className="card-text">{artwork.artist}</p>
                <p className="card-text">{artwork.description}</p>
                </div> */}
    </li>
  );
}
