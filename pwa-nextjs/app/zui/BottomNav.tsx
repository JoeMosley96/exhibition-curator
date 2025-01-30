import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHome,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

import React from "react";
import Link from "next/link";

const tabs = [
  {
    route: "/",
    icon: faHome,
    label: "Home",
  },
  {
    route: "/search",
    icon: faSearch,
    label: "Search",
  },
  {
    route: "/user/artlover1",
    icon: faUserCircle,
    label: "Profile",
  },
];

export default function BottomNav() {
  return (
      <div
        className="navbar fixed bottom-0 navbar-light block sm:hidden bg-ghost"
        role="navigation"
      >
        <div className=" d-flex flex-row justify-around w-[100%] ">
          {tabs.map((tab, index) => (
            <Link href={tab.route} className="nav-link bottom-nav-link w-10  flex justify-center">
              <button className="btn">
                <FontAwesomeIcon
                  className="text-black"
                  size="lg"
                  icon={tab.icon}
                />
                <span>{tab.label}</span>
              </button>
            </Link>
          ))}
        </div>
      </div>
    
  );
}
