"use client";

import React, {useState} from "react"
import { useParams } from "next/navigation";
import { addArtworkToNewCollection } from "../lib/data/collections";
import { useRouter } from "next/navigation";

export default function CollectionForm() {
    const [collectionName, setCollectionName]=useState("")
    const [description, setDescription]=useState("")
    const { artworkId } = useParams<{ artworkId: string }>();
    const router = useRouter()

    async function handleSubmit(artworkId: string, collectionName:string, description:string, userId:number){
        const newCollection = await addArtworkToNewCollection(artworkId, collectionName, description, userId)
        if (newCollection){
          router.push(`/artwork/${artworkId}?new_collection=${newCollection.collectionInfo.collection_id}`)
        }
    }

  return (
    <form onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit(artworkId, collectionName, description, 1)
    }}>
      <input 
      type="text"
      id="collection-name"
      placeholder="Add Collection Name"
      autoComplete="off"
      onChange={(e)=>{
        setCollectionName(e.target.value)
      }}
      />
      <input 
      type="text"
      id="collection-name"
      placeholder="Add Description (optional)"
      autoComplete="off"
      onChange={(e)=>{
        setDescription(e.target.value)
      }}
      />
      <button type="submit">
        Create
      </button>
    </form>
  );
}
