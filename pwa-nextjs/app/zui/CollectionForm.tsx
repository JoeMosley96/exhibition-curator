"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { addArtworkToNewCollection } from "../lib/data/collections";
import { useRouter } from "next/navigation";
import validateCreateForm from "@/app/utils/valalidation_utils";
import ErrorAlert from "./ErrorAlert";

export default function CollectionForm() {
  const [collectionName, setCollectionName] = useState("");
  const [description, setDescription] = useState("");
  const { artworkId } = useParams<{ artworkId: string }>();
  const router = useRouter();
  const [errors, setErrors] = useState({ title: "", serverError: "" });

  async function createCollection(formData: FormData) {
    console.log(formData);
    try {
      console.log(
        "formData.get(`collection-name`)",
        formData.get("collection-name")
      );
      const collection = {
        title: (formData.get("collection-name") as string) || "",
      };

      const formErrors = validateCreateForm(collection);
      if (formErrors.title.length) {
        setErrors(formErrors);
      } else {
        const newCollection = await addArtworkToNewCollection(
          artworkId,
          collectionName,
          description,
          1
        );
        if (newCollection) {
          router.push(
            `/artwork/${artworkId}?new_collection=${newCollection.collectionInfo.collection_id}`
          );
        }
      }
    } catch (error) {
      setErrors({ title: "", serverError: "Please try again." });
    }
  }
  return (
    <form
      action={createCollection}
    >
      <div className="grid grid-cols-2 gap-3 mb-5">
        <label className="form-control w-full max-w-xs ">
          <div className="label">
            <span className="label-text">Add Collection Name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            id="collection-name"
            name="collection-name"
            autoComplete="off"
            onChange={(e) => {
              setCollectionName(e.target.value);
            }}
          />
          {errors.title.length ? (
          <ErrorAlert
          errors={errors}
          setErrors={setErrors}
          errorKey={"title"}
          />
        ) : null}
        </label>

        <label className="form-control w-full h-16 max-w-xs">
          <div className="label">
            <span className="label-text">Add Description (Optional)</span>
          </div>
          <input
            type="text"
            id="collection-description"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            autoComplete="off"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </label>
      </div>
      <button className="btn btn-primary" type="submit">
        Create
      </button>
    </form>
  );
}
