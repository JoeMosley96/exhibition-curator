"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import AutoComplete from "../zui/AutoComplete";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import ArtworkCard from "../zui/ArtworkCard";
import Pagination from "../zui/Pagination";
import { Artwork, getArtsySearchResultsPage } from "../lib/data/artworks";
import {getArtsyArtworks, getAllArtsySearchResults, getVAMArtworks } from "../lib/data/artworks"; // Adjust the import path as necessary

export default function Search() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [artworksList, setArtworksList] = useState<Artwork[]>([]);
  const [allArtsyResults, setAllArtsyResults] = useState<Artwork[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pageNumber = Number(params.get("page")) || 1;

  const pathname = usePathname();
  const router = useRouter();

  // this function sets the searchValue state
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log("submitting", searchInput);
    event.preventDefault();
    setSearchValue(searchInput);
    setSearchInput("");
  }

  useEffect(()=>{
    async function fetchData(searchValue: string){
      const artsyResponse = await getAllArtsySearchResults(searchValue)
      if (artsyResponse){
      setTotalPages(artsyResponse.pages)
      setAllArtsyResults(artsyResponse.artworks)
      }
    } 
    fetchData(searchValue)
  },[searchValue])

  useEffect(() => {
    if (searchValue.length && allArtsyResults.length) {
      params.set("page", pageNumber.toString());
      if (searchValue) {
        params.set("query", searchValue);
      } else {
        params.delete("query");
      }
      router.replace(`${pathname}?${params.toString()}`);

      async function fetchData(allArtsyResults:Artwork[], pageNumber: number) {
        const paginatedArtsyResults = getArtsySearchResultsPage(allArtsyResults, pageNumber)
        console.log("getting a set of", paginatedArtsyResults.artworks.length)
        setArtworksList(paginatedArtsyResults.artworks)
      }
      fetchData(allArtsyResults, pageNumber);
    } else {
      router.replace(`${pathname}`);
    }
  }, [searchValue, pathname, pageNumber, allArtsyResults]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="search-box">
          <div className="search-row">
            <input
              value={searchInput}
              type="text"
              id="input-box"
              placeholder="Search anything"
              autoComplete="off"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <button>
              <FontAwesomeIcon
                type="submit"
                icon={faMagnifyingGlass}
                onClick={() => {
                  setSearchValue(searchInput);
                }}
                className="fa-solid"
              />
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
      {params.get("query")?.length && (
        <>
          <h1 className="text-center text-3xl font-bold mt-10">
            Search Results for "{searchValue}"
          </h1>
          <ul className="flex flex-wrap justify-center items-center gap-3 mt-10 pl-0 pb-16 border-2">
            {artworksList?.map((artwork) => (
              <ArtworkCard key={artwork.artworkId} artwork={artwork} />
            ))}
            <Pagination totalPages={totalPages <= 10 ? totalPages : 10} />
            <br />
          </ul>
        </>
      )}
    </>
  );
}
