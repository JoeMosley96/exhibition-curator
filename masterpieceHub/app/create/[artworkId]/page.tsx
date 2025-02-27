import React from "react";
import CollectionForm from "../../zui/CollectionForm";


export default async function Create() {
  return (
    <div className="sm:pt-16 flex flex-col items-center">
      <article className="prose mb-12 mt-5">
      <h1>Create Collection</h1>
        </article>
      <CollectionForm />
    </div >
  );
}
