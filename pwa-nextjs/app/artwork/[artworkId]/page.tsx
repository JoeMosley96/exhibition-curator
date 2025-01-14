import {
  getVAMArtworkById,
  getArtsyArtworkById,
} from "@/app/lib/data/artworks";
import DOMPurify from "isomorphic-dompurify";

export default async function SingleArtwork(props: {
  params: { artworkId: string };
}) {
  const { artworkId } = props.params;
  const isFromVAM = artworkId.startsWith("O");
  let artwork;
  if (isFromVAM) {
    artwork = await getVAMArtworkById(artworkId);
  } else {
    artwork = await getArtsyArtworkById(artworkId);
  }

  if (artwork) {
    const sanitizedDescription = artwork.description ? DOMPurify.sanitize(artwork.description) : '';
    const sanitizedHistory = artwork.history ? DOMPurify.sanitize(artwork.history) : '';

    return (
      <div className="pb-16">
        <h1>{artwork.title}</h1>
        <h2>By {artwork.artist}</h2>
        <img src={artwork.imageURL} alt={artwork.title} />
        {artwork.description && <p dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />}
        {artwork.history && <p dangerouslySetInnerHTML={{ __html: sanitizedHistory }} />}
      </div>
    );
  }

  return <div>No artwork found</div>;
}