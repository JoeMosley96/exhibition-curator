"use client";
import { getVAMArtworks, getChicArtworks } from "../lib/data/artworks";
import ArtworkCard from "./ArtworkCard";
import Pagination from "./Pagination";
import { shuffle } from "../utils/utils";
import React, { useState, useEffect } from "react";
import { Artwork } from "../lib/data/artworks";
import Spinner from "./spinner/Spinner";
import { Suspense } from "react";
export default function ArtworksList({
  query,
  pageNumber,
}: {
  query: string;
  pageNumber: number;
}) {
  const [totalPages, setTotalPages] = useState(1);
  const [artworksList, setArtworksList] = useState<Artwork[]>([]);
  const [artworksCol1, setArtworksCol1] = useState<Artwork[]>([]);
  const [artworksCol2, setArtworksCol2] = useState<Artwork[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [vamArtworks, chicArtworks] = [
        await getVAMArtworks(pageNumber, query),
        await getChicArtworks(pageNumber, query),
      ];
      const artworks = [
        ...(vamArtworks?.artworks || []),
        ...(chicArtworks?.artworks || []),
      ];
      shuffle(artworks);
      setArtworksList(artworks);
      const totalPages = vamArtworks?.pages + chicArtworks?.pages;
      setTotalPages(totalPages);
    }

    fetchData();

    const col1: Artwork[] = [];
    const col2: Artwork[] = [];
    const heights = [0, 0];

    artworksList.forEach((artwork) => {
      const image = new Image();
      image.onload = function () {
        const imageHeight = image.height || 300
        const imageWidth = image.width || 300
        if (heights[0] <= heights[1]) {
          col1.push(artwork);
          heights[0] += imageHeight / imageWidth;
        } else {
          col2.push(artwork);
          heights[1] += imageHeight / imageWidth;
        }
      };
      image.src = artwork.imageURL + "?cache_buster=" + new Date().getTime();
    });
    setArtworksCol1(col1);
    setArtworksCol2(col2);
  }, [query, pageNumber, artworksList]);
  // console.log("allHeights", allHeights)

  return (
    <div className="flex flex-col">
      <Suspense fallback={<Spinner />}>
        <div className="flex gap-3 pl-0 ">
          <ul>
            <div className="flex flex-1 flex-col flex-wrap gap-3">
              {artworksCol1?.map((artwork) => (
                <ArtworkCard key={artwork.artworkId} artwork={artwork} />
              ))}
            </div>
          </ul>
          <ul>
            <div className="flex flex-1 flex-col flex-wrap gap-3">
              {artworksCol2?.map((artwork) => (
                <ArtworkCard key={artwork.artworkId} artwork={artwork} />
              ))}
            </div>
          </ul>
        </div>
      </Suspense>
      <div className="pb-16">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}