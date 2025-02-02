"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

 
export default function NotFound() {
    
const router=useRouter()
  return (
    <main className="mt-20 flex h-full flex-col items-center justify-center gap-2">
      <FontAwesomeIcon icon={faFrown} className="w-20 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested collection.</p>
      <button
        onClick={()=>{router.back()}}
        className="mt-4 btn btn-primary"
      >
        Go Back
      </button>
    </main>
  );
}