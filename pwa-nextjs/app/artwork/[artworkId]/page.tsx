import {
  getVAMArtworkById,
  getArtsyArtworkById,
} from "@/app/lib/data/artworks";

export default async function SingleArtwork(props: {
  params: Promise<{ artworkId: string }>;
}) {
  const params = await props.params;
  const artworkId = params.artworkId;
  const isFromVAM = artworkId.startsWith("O");
  let artwork;
  isFromVAM
    ? (artwork = await getVAMArtworkById(artworkId))
    : (artwork = await getArtsyArtworkById(artworkId));
  console.log(artwork);

  if (artwork){
      return (
        <div>
          <h1>{artwork.title}</h1>
          <h2>By {artwork.artist}</h2>
          <img src={artwork.imageURL} alt={artwork.title} />
          <p>{artwork.description}</p>
          <p>{artwork.history}</p>
        </div>
      );
  }
}
