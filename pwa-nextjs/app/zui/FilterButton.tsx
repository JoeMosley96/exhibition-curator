"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function FilterButton() {
//   const router = useRouter();

  return (
    <button
      className="w-32 bg-blue-600 p-3 rounded-2xl border-none text-white cursor-pointer hover:bg-blue-700"
      popoverTarget="filterpopover"
    >
      <FontAwesomeIcon icon={faFilter} />
    </button>
  );
}
