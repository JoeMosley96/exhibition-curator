"use client";

import CollectionsDialog from "@/app/zui/CollectionsDialog";
import BackButton from "@/app/zui/BackButton";
import SaveButton from "@/app/zui/SaveButton";
import DOMPurify from "isomorphic-dompurify";
import Success from "./Success";
import Removed from "./Removed";
import React, { useState, useEffect } from "react";
import { checkSaved, getCollectionById } from "../lib/data/collections";
import parse from "html-react-parser";

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

  const [justAdded, setJustAdded] = useState(false);
  const [justRemoved, setJustRemoved] = useState(false);
  const [saved, setSaved] = useState(false);
  const [chosenCollection, setChosenCollection] = useState({
    collection_id: 0,
    title: "",
    user_id: 0,
    description: "",
    created_at: "",
  });
  console.log(artwork)

  useEffect(() => {
    const checkIfSaved = async () => {
      const saved = (await checkSaved(1, artwork.artworkId)) ?? {saved:false, collectionId:0};
      console.log("Saved?", saved);
      setSaved(saved.saved);
      const collection = await getCollectionById(saved.collectionId)
      if (collection?.collectionInfo) {
        setChosenCollection(collection?.collectionInfo);
      }
    };
    checkIfSaved();
  }, [justAdded, justRemoved]);

  return (
    <>
      <div className="pb-16 flex flex-col h-full items-center">
        <BackButton />
        <h1>{artwork.title}</h1>
        <h2>By {artwork.artist}</h2>
        <img src={artwork.imageURL} alt={artwork.title} />
        {artwork.description && (
          <div>{parse(sanitizedDescription)}</div>
        )}
        {artwork.history && (
          <div>{parse(sanitizedHistory)}</div>
        )}
        <SaveButton
          setJustRemoved={setJustRemoved}
          saved={saved}
          artworkId={artwork.artworkId}
          chosenCollection={chosenCollection}
        />
      </div>
      <CollectionsDialog
        userCollections={userCollections}
        setJustAdded={setJustAdded}
        setChosenCollection={setChosenCollection}
      />
      {justAdded && <Success setJustAdded={setJustAdded} chosenCollection={chosenCollection} />}
      {justRemoved && (
        <Removed setJustRemoved={setJustRemoved}chosenCollection={chosenCollection} setSaved={setSaved} />
      )}
    </>
  );
}
