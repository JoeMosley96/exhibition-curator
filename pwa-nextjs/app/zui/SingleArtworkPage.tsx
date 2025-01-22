"use client";

import CollectionsDialog from "@/app/zui/CollectionsDialog";
import BackButton from "@/app/zui/BackButton";
import SaveButton from "@/app/zui/SaveButton";
import DOMPurify from "isomorphic-dompurify";

export default function SingleArtworkPage({
  artwork,
  userCollections,
}: {
  artwork: any;
  userCollections: any;
}) {
  const sanitizedDescription = artwork.description
    ? DOMPurify.sanitize(artwork.description)
    : "";
  const sanitizedHistory = artwork.history
    ? DOMPurify.sanitize(artwork.history)
    : "";

  return (
    <>
      <div className="pb-16">
        <BackButton />
        <h1>{artwork.title}</h1>
        <h2>By {artwork.artist}</h2>
        <img src={artwork.imageURL} alt={artwork.title} />
        {artwork.description && (
          <p dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        )}
        {artwork.history && (
          <p dangerouslySetInnerHTML={{ __html: sanitizedHistory }} />
        )}
        <SaveButton artworkId={artwork.artworkId} />
      </div>
      <CollectionsDialog userCollections={userCollections} />
    </>
  );
}
