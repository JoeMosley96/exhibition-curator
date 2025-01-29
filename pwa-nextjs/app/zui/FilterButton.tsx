"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function FilterButton() {
  //   const router = useRouter();

  return (
    <button
      data-theme="cupcake"
      className="btn btn-secondary w-44"
      popoverTarget="filterpopover"
    >
      <div>
        <FontAwesomeIcon icon={faFilter} />
      </div>
    </button>
    // <button className="btn">Primary</button>
    // <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">Responsive</button>
  );
}
