import React,{Suspense} from "react";
import EmbeddedSearch from "./EmbeddedSearch";
import Link from "next/link";
import { getUserById } from "../lib/data/users";

import IKImageClient from "./IKImageClient";

export default async function TopNav() {
  const userDetails = await getUserById(1);
  return (
    <nav className="navbar fixed top-0 sm:flex justify-between bg-base-100 hidden z-99">
      <Link href="/">
        <div className="flex-1 ">
          <p className="btn btn-ghost text-xl">masterpieceHub</p>
        </div>
      </Link>
      <div className="flex-none gap-2 ">
        <Suspense>
          <EmbeddedSearch />
        </Suspense>
        <div className="dropdown dropdown-end pr-4">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 object-cover rounded-full">
              <Link href={`/user/${userDetails?.userInfo.username}`}>
                <IKImageClient
                  width={200}
                  height={200}
                  alt="Tailwind CSS Navbar component"
                  src={userDetails?.userInfo.avatar_img_url}
                />
              </Link>
            </div>
          </div>
          {/* <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>
                Profile
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul> */}
        </div>
      </div>
    </nav>
  );
}
