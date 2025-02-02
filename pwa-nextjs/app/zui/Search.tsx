"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { searchSuggestions } from "../lib/data/search";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
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
    replace(`${pathname}?${params.toString()}`);
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
      <div className="search-box">
        <div className="search-row ">
          <input
            defaultValue={searchParams.get("query")?.toString() || searchInput}
            type="text"
            id="input-box"
            placeholder="Search for anything"
            autoComplete="off"
            onChange={(e) => {
              setSearchInput(e.target.value || "");
            }}
            ref={searchBox}
            // value={searchInput || searchParams.get("query")?.toString()}
          />
          <button type="submit">
            <FontAwesomeIcon className="fa-solid" icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className="result-box">
          {filteredSuggestions &&
            filteredSuggestions.map((keyword, i) => (
              <button
                // type="submit"
                key={i}
                onClick={() => {
                  setSearchInput(keyword)
                  handleSubmit(keyword);
                }}
                className="result-box flex justify-between"
              >
                {keyword}
                <div>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="fa-solid"
                  />
                </div>
              </button>
            ))}
        </div>
      </div>
    </form>
  );
}
