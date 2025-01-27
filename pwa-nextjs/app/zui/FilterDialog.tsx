"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
export default function FilterDialog() {
  interface IntrinsicElements {
    dialog: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [popover, setPopover] = useState<HTMLElement | null>(null);

  const artworksRadio = useRef<HTMLInputElement>(null);
  const profilesRadio = useRef<HTMLInputElement>(null);
  const collectionsRadio = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPopover(document.getElementById("filterpopover"));
  }, []);

  function handleSubmit() {
    const params = new URLSearchParams(searchParams);
    if (artworksRadio.current?.checked) {
      console.log("artworks radio is checked");
      params.set("filter", "artworks")
    }
    if (profilesRadio.current?.checked) {
      params.set("filter", "profiles")
      console.log("profiles radio is checked");
    }
    if (collectionsRadio.current?.checked) {
      params.set("filter", "collections")
      console.log("collections radio is checked");
    }
    replace(`${pathname}?${params.toString()}`)
    popover?.hidePopover();
  }

  return (
    <dialog
      id="filterpopover"
      className="border-none p-8 rounded-2xl w-full sm:max-w-xl"
      popover="manual"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <button
          className="bg-none border-none float-left cursor-pointer"
          popoverTarget="filterpopover"
          popoverTargetAction="hide"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h4 className="mt-0">Filters</h4>
        <input
          type="radio"
          id="artworks"
          ref={artworksRadio}
          name="filter_preference"
          value="Artworks"
          defaultChecked
        />
        <label htmlFor="artworks">Artworks</label>
        <br />
        <input
          type="radio"
          id="profiles"
          ref={profilesRadio}
          name="filter_preference"
          value="Profiles"
        />
        <label htmlFor="profiles">Profiles</label>
        <br />
        <input
          type="radio"
          id="collections"
          ref={collectionsRadio}
          name="filter_preference"
          value="Collections"
        />
        <label htmlFor="collections">Collections</label>
        <br />
        <button
          type="submit"
          className="w-32 bg-blue-600 p-3 rounded-2xl border-none text-white cursor-pointer hover:bg-blue-700"
          // onClick={()=>{
          //   const params = new URLSearchParams(searchParams)
          //   params.set("type", )
          //   popover?.hidePopover()
          // }}
          // popoverTarget="filterpopover"
          // popoverTargetAction="hide"
        >
          Apply
        </button>
      </form>
    </dialog>
  );
}
