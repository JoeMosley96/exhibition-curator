"use client"
import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"


export default function BackButton(){
    const router=useRouter()
return (
    <button className="btn absolute top-2 left-2" onClick={()=>{router.back()}}><FontAwesomeIcon icon={faArrowLeft}/></button>)
}