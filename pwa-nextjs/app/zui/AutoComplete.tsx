"use client";
import { searchSuggestions } from "../lib/data/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { use } from "react";


export default function AutoComplete({
  searchInput,
  setSearchInput,
}: {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  let filteredSuggestions: string[] = [];
  if (searchInput.length) {
    filteredSuggestions = searchSuggestions.filter((keyword) => {
      return keyword.toLowerCase().includes(searchInput.toLowerCase());
    });
  }
  if (filteredSuggestions.length) {
    return filteredSuggestions.map((keyword, i) => (
      <button
        type="submit"
        key={i}
        onClick={() => {
          setSearchInput(keyword);
        }}
        className="result-box flex justify-between"
      >
        {keyword}
        <div>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-solid" />
        </div>
      </button>
    ));
  }
}
