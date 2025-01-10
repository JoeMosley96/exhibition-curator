import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHome,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

import React from "react";
import { Nav, NavItem } from "reactstrap";
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
    route: "/user/1",
    icon: faUserCircle,
    label: "Login",
  },
];
export default function BottomNav() {
  return (
    <div>
      {/* Bottom Tab Navigator*/}
      <nav className="navbar fixed-bottom navbar-light d-block d-lg-none bg-slate-100 bottom-tab-nav" role="navigation">
        <Nav className="w-100 ">
          <div className=" d-flex flex-row justify-content-around w-100">
            {tabs.map((tab, index) => (
              <NavItem key={`tab-${index}`}>
                <Link href={tab.route} className="nav-link bottom-nav-link w-16">
                  <div className="row d-flex flex-column justify-items-center align-items-center">
                    <FontAwesomeIcon className ="text-black" size="lg" icon={tab.icon} />
                    <div className="hidden">{tab.label}</div>
                  </div>
                </Link>
              </NavItem>
            ))}
          </div>
        </Nav>
      </nav>
    </div>
  );
}
