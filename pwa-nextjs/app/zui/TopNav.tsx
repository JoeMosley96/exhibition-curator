import React from "react";
import EmbeddedSearch from "./EmbeddedSearch";
import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="navbar fixed top-0 sm:flex justify-between bg-base-100 hidden z-99">
      <Link href="/">
      <div className="flex-1 ">
        <p className="btn btn-ghost text-xl">masterpieceHub</p>
      </div>
      </Link>
      <div className="flex-none gap-2 ">
          <EmbeddedSearch/>
        <div className="dropdown dropdown-end pr-4">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a >
                Profile
                {/* <span className="badge">New</span> */}
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// <div>
// <nav
//   className="navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top"
//   role="navigation"
// >
//   <div className="container-fluid">
//     <Link className="navbar-brand" href="/">
//       MasterpieceHub
//     </Link>
//     <Nav className="ml-auto">
//       <NavItem>
//         <Link href="/search" className="nav-link">
//           Search
//         </Link>
//       </NavItem>
//       <NavItem>
//         <Link href="/user/artlover1" className="nav-link">
//           Profile
//         </Link>
//       </NavItem>
//     </Nav>
//   </div>
// </nav>
// </div>
