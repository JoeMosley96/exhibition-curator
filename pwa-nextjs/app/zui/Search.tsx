"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import AutoComplete from "./AutoComplete";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchInput, setSearchInput] = useState("");

  function handleSubmit(searchInput: string) {
    const params = new URLSearchParams(searchParams);
    params.set("query", searchInput);
    params.set("page", "1");
    if (!searchInput) {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(searchInput)
          setSearchInput("");
        }}
      >
        <div className="search-box">
          <div className="search-row ">
            <input
              value={searchInput}
              type="text"
              id="input-box"
              placeholder="Search for anything"
              autoComplete="off"
              onChange={(e) => {
                console.log(e.target.value)
                setSearchInput(e.target.value);
              }}
            />
            <button type="submit">
              <FontAwesomeIcon className="fa-solid" icon={faMagnifyingGlass} />
            </button>
          </div>
          <div className="result-box">
            <AutoComplete
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </div>
        </div>
      </form>
  
  );
}
