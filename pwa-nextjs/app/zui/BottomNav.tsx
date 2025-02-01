"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHome,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React,{useState, useEffect} from "react"

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
  const [selectedArr, setSelectedArr] = useState([false, false, false])
  const pathname=usePathname()

  useEffect(()=>{
    
    if(pathname.includes("search")){
      setSelectedArr([false, true, false])
    } else if(pathname.includes("user/artlover1")){
      setSelectedArr([false, false, true])
    } else if(pathname===("/") || pathname.startsWith("/?")){
      setSelectedArr([true, false, false])
    }
  },[pathname])

  return (
      <div
        className="navbar fixed bottom-0 block sm:hidden bg-white"
        role="navigation"
      >
        <div className=" d-flex flex-row justify-around w-[100%] dock dock-md ">
          {tabs.map((tab,i) => (
            <Link key={tab.label} href={tab.route} className="w-10  flex justify-center">
              <button >
                <FontAwesomeIcon
                  className="text-black "
                  size="lg"
                  icon={tab.icon}
                />
                <span className={selectedArr[i]===true ? "font-bold underline" : ""}>{tab.label}</span>
              </button>
            </Link>
          ))}
        </div>
      </div>
    
  );
}
