import React from "react";
import BackButton from "../../zui/BackButton";
import CollectionForm from "../../zui/CollectionForm";

export default async function Create() {
  return (
    <>
      <BackButton />
      <h1>Create Collection</h1>
      <CollectionForm />
    </>
  );
}
