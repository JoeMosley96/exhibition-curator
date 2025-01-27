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
    if (!params.has("filter")){
      params.set("filter", "artworks")
    }
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
              defaultValue={searchParams.get("query")?.toString() }
              type="text"
              id="input-box"
              placeholder="Search for anything"
              autoComplete="off"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              // defaultValue={searchParams.get("query")?.toString()}
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
