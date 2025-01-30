"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams, usePathname, useRouter, useParams } from "next/navigation";
import React, { useState, useRef } from "react";
import { searchSuggestions } from "../lib/data/search";

export default function EmbeddedSearch() {

 
  const searchParams = useSearchParams();
  const pathname = usePathname();
  console.log(pathname)
  const { replace } = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const searchBox = useRef<HTMLInputElement>(null);
  const searchForm = useRef<HTMLFormElement>(null!);

  function handleSubmit(searchInput: string) {
    const params = new URLSearchParams(searchParams);
    params.set("query", searchInput);
    if (searchBox.current) {
      searchBox.current.value = searchInput;
    }
    if (!params.has("filter")) {
      params.set("filter", "artworks");
    }
    params.set("page", "1");
    if (!searchInput) {
      params.delete("query");
      params.delete("filter");
      params.delete("page");
    }
    replace(`/search?${params.toString()}`);
  }

  let filteredSuggestions: string[] = [];
  if (searchInput.length) {
    filteredSuggestions = searchSuggestions.filter((keyword) => {
      return keyword.toLowerCase().includes(searchInput.toLowerCase()) && keyword !== searchInput;
    });
  }

  return (
    <form
      ref={searchForm}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(searchInput);
        setSearchInput("");
      }}
    >
      <div className="relative ">
        {/* <div className="form-control "> */}
        <label className="input input-bordered flex items-center gap-2 sm:w-96">

          <input
            defaultValue={searchParams.get("query")?.toString() || searchInput}
            type="text"
            id="input-box"
            placeholder="Search"
            autoComplete="off"
            onChange={(e) => {
              setSearchInput(e.target.value || "");
            }}
            ref={searchBox}
            className="grow"
            // value={searchInput || searchParams.get("query")?.toString()}
            />
          <button type="submit">
            <FontAwesomeIcon className="fa-solid" size="sm" icon={faMagnifyingGlass} />
          </button>
            </label>
        {/* </div> */}
        <div className="result-box w-24">
          {filteredSuggestions &&
            filteredSuggestions.map((keyword, i) => (
              <button
                key={i}
                onClick={() => {
                  setSearchInput(keyword)
                  handleSubmit(keyword);
                }}
                className="flex justify-between"
              >
                <div>
                 <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="fa-solid"
                  />
                </div>
                {keyword}
                 
              </button>
            ))}
        </div>
      </div>
    </form>
  );
}
