"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function FilterDialog() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const [popover, setPopover] = useState<HTMLElement | null>(null);

  const artworksRadio = useRef<HTMLInputElement>(null);
  const profilesRadio = useRef<HTMLInputElement>(null);
  const collectionsRadio = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // setPopover(document.getElementById("filterpopover"));
    console.log("in use effect");
    const params = new URLSearchParams(searchParams);
    const filterApplied = params.get("filter");
    if (filterApplied === "collections") {
      if (collectionsRadio.current) {
        collectionsRadio.current.checked = true;
      }
    } else if (filterApplied === "profiles") {
      if (profilesRadio.current) {
        profilesRadio.current.checked = true;
      }
    } else {
      if (artworksRadio.current) {
        artworksRadio.current.checked = true;
      }
    }
  }, [searchParams]);

  function handleSubmit() {
    const params = new URLSearchParams(searchParams);
    if (artworksRadio.current?.checked) {
      params.set("filter", "artworks");
    }
    if (profilesRadio.current?.checked) {
      params.set("filter", "profiles");
    }
    if (collectionsRadio.current?.checked) {
      params.set("filter", "collections");
    }
    replace(`${pathname}?${params.toString()}`);
    // popover?.hidePopover();
  }

  return (
    <dialog id="filterDialog" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Filters</h3>
        <div className="modal-action border-t-2  mt-3 pt-3">
          <form
            className="w-full"
            method="dialog"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <button
              onClick={() => {
                (
                  document.getElementById("filterDialog") as HTMLDialogElement
                )?.close();
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <div className="mb-2">
              <input
                type="radio"
                className="radio bg-gray-100 "
                id="artworks"
                ref={artworksRadio}
                name="filter_preference"
                value="Artworks"
              />
              <label className="ml-2" htmlFor="artworks">
                Artworks
              </label>
            </div>
            <div className="mb-2">
              <input
                type="radio"
                className="radio bg-gray-100"
                id="profiles"
                ref={profilesRadio}
                name="filter_preference"
                value="Profiles"
              />
              <label className="ml-2" htmlFor="profiles">
                Profiles
              </label>
            </div>
            <div className="mb-2 ">
              <input
                type="radio"
                className="radio bg-gray-100"
                id="collections"
                ref={collectionsRadio}
                name="filter_preference"
                value="Collections"
              />
              <label className="mb-5 ml-2" htmlFor="collections">
                Collections
              </label>
            </div>
            <div className="pt-3 pb-0">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="btn btn-neutral w-[50%] ml-[25%]"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>

    // <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
    //   <div className="modal-box">
    //     <h3 className="font-bold text-lg">Hello!</h3>
    //     <p className="py-4">Press ESC key or click the button below to close</p>
    //     <div className="modal-action">
    //       <form method="dialog">
    //         {/* if there is a button in form, it will close the modal */}
    //         <button className="btn">Close</button>
    //       </form>
    //     </div>
    //   </div>
    // </dialog>
    // <dialog
    //   id="my_modal_1'"
    //   className="modal"
    //   popover="manual"
    // >
    //   <form
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       handleSubmit();
    //     }}
    //   >
    //     <button
    //       className="bg-none border-none float-left cursor-pointer"
    //       popoverTarget="filterpopover"
    //       popoverTargetAction="hide"
    //     >
    //       <FontAwesomeIcon icon={faXmark} />
    //     </button>
    //     <h3 className="font-bold text-lg">Hello!</h3>
    //     <input
    //       type="radio"
    //       id="artworks"
    //       ref={artworksRadio}
    //       name="filter_preference"
    //       value="Artworks"
    //     />
    //     <label htmlFor="artworks">Artworks</label>
    //     <br />
    //     <input
    //       type="radio"
    //       id="profiles"
    //       ref={profilesRadio}
    //       name="filter_preference"
    //       value="Profiles"
    //     />
    //     <label htmlFor="profiles">Profiles</label>
    //     <br />
    //     <input
    //       type="radio"
    //       id="collections"
    //       ref={collectionsRadio}
    //       name="filter_preference"
    //       value="Collections"
    //     />
    //     <label htmlFor="collections">Collections</label>
    //     <br />
    //     <button
    //       type="submit"
    //       className="w-32 bg-blue-600 p-3 rounded-2xl border-none text-white cursor-pointer hover:bg-blue-700"
    //     >
    //       Apply
    //     </button>
    //   </form>
    // </dialog>
  );
}
