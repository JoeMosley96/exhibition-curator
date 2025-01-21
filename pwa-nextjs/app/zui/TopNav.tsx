import React from "react";
import { Nav, NavItem } from "reactstrap";
import Link from "next/link";

export default function TopNav() {
  return (
    <div>
    <nav className="navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top" 	role="navigation">
        <div className="container-fluid">
            <Link className="navbar-brand" href="/">MasterpieceHub</Link>
            <Nav className="ml-auto">
              <NavItem>
                <Link href="/search" className="nav-link">
                  Search
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/user/1" className="nav-link">
                  Login
                </Link>
              </NavItem>
            </Nav>
        </div>
      </nav>
    </div>
  );
}
