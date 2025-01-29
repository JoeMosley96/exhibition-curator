"use client";

import CollectionsDialog from "@/app/zui/CollectionsDialog";
import BackButton from "@/app/zui/BackButton";
import SaveButton from "@/app/zui/SaveButton";
import DOMPurify from "isomorphic-dompurify";
import Success from "./Success";
import Removed from "./Removed";
import React, { useState, useEffect } from "react";
import { checkSaved, getCollectionById, Collection } from "../lib/data/collections";
import parse from "html-react-parser";
import { useSearchParams } from "next/navigation";
import { Artwork } from "../lib/data/artworks";

export default function SingleArtworkPage({
  artwork,
  userCollections,
}: {
  artwork: Artwork;
  userCollections: Collection[];
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


  const searchParams = useSearchParams();

  useEffect(() => {
    const checkIfSaved = async () => {
      const saved = await checkSaved(1, artwork.artworkId);
      if (saved) {
        const collection = await getCollectionById(saved.collectionId);
        if(collection && collection.collectionInfo){
          setChosenCollection(collection?.collectionInfo);
        }
        setSaved(saved.saved);
      }
    };
    checkIfSaved();
  }, [justAdded, justRemoved, artwork.artworkId]);

  useEffect(() => {
    const checkNewCollection = async () => {
      const params = new URLSearchParams(searchParams);
      const new_collection = params.get("new_collection");
      if (new_collection) {
        const collection = await getCollectionById(Number(new_collection));
        if(collection && collection.collectionInfo){
          setChosenCollection(collection?.collectionInfo);
          setJustAdded(true);
          setSaved(true);        
        }
      }
    };
    checkNewCollection();
  }, [setJustAdded, searchParams]);

  useEffect(()=>{

  },[])

  return (
    <>
      <div className="pb-16 flex flex-col h-screen items-center">
        <BackButton />
        <h1>{artwork.title}</h1>
        <h2>By {artwork.artist}</h2>
        <img src={artwork.imageURL} alt={artwork.title} />
        {artwork.description && <div>{parse(sanitizedDescription)}</div>}
        {artwork.history && <div>{parse(sanitizedHistory)}</div>}
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
      {justAdded && (
        <Success
          setJustAdded={setJustAdded}
          chosenCollection={chosenCollection}
        />
      )}
      {justRemoved && (
        <Removed
          setJustRemoved={setJustRemoved}
          chosenCollection={chosenCollection}
          setSaved={setSaved}
        />
      )}
    </>
  );
}
