"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function FilterButton() {

  return (
    <button
      className="btn w-24"
      onClick={() => {
        (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal();
      }}
    >
      <FontAwesomeIcon icon={faFilter} />
    </button>
  );
}
