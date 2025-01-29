import { motion } from "framer-motion";
import React, { useEffect } from "react";


export default function Removed({
  setJustRemoved,
  chosenCollection,
  setSaved,
}: {
  setJustRemoved: React.Dispatch<React.SetStateAction<boolean>>;
  chosenCollection: {
    collection_id: number;
    title: string;
    user_id: number;
    description: string;
    created_at: string;
  };
  setSaved: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    setTimeout(() => {
      setJustRemoved(false)
      setSaved(false);
    }, 3000);
  }, [setJustRemoved, setSaved]);

  return (
    <div className="flex justify-center items-center">
        <motion.div
          className="fixed top-5 sm:w-2/5 w-full h-20 bg-white shadow-lg rounded-lg flex justify-center items-center"
          animate={{ y: 0 }}
          initial={{ y: -220 }}
        >
          {/* <motion.div animate={{ scale: 1 }} initial={{ scale: 0 }}>
            <FontAwesomeIcon
              className="w-24 h-24 ml-5 mb-10 sm:ml-12 sm:mb-0"
              color="green"
              icon={faCheckCircle}
            />
          </motion.div> */}
          <p className="text-black text-xl">
            Removed from {chosenCollection.title}
          </p>
        </motion.div>
    </div>
  );
}
