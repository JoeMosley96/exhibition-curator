"use server";

import { getChicArtworkById, getVAMArtworkById } from "@/app/lib/data/artworks";
import { getCollectionsByUserId } from "@/app/lib/data/collections";
import SingleArtworkPage from "@/app/zui/SingleArtworkPage";
import Spinner from "../../zui/Spinner"
import React, {Suspense} from "react";
import {notFound} from "next/navigation"

export type paramsType = Promise<{ artworkId: string }>;

export default async function SingleArtwork({
  params,
}: {
  params: paramsType;
}) {
  const userCollections = await getCollectionsByUserId(1);
  const { artworkId } = await params;
  const isFromVAM = artworkId.startsWith("O");
  let artwork;
  if (isFromVAM) {
    artwork = await getVAMArtworkById(artworkId);
  } else {
    artwork = await getChicArtworkById(artworkId);
  }

  if (artwork) {
    return (
      <Suspense fallback={<Spinner/>}>
        <SingleArtworkPage
          artwork={artwork}
          userCollections={userCollections}
        />
      </Suspense>
    );
  } else{
    notFound()
  }
}
