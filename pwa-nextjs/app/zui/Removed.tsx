import { motion } from "framer-motion";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

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
  }, []);

  // console.log("removed alert", alert)

  return (
    <div className="flex justify-center">
        <motion.div
          className="w-7/12 h-56  bg-white flex items-center shadow-lg rounded-lg"
          animate={{ y: -220 }}
          initial={{ y: 0 }}
        >
          <motion.div animate={{ scale: 1 }} initial={{ scale: 0 }}>
            <FontAwesomeIcon
              className="w-24 h-24 ml-5 mb-10 sm:ml-12 sm:mb-0"
              color="green"
              icon={faCheckCircle}
            />
          </motion.div>
          <p className="text-center text-black mb-10 sm:mb-0 ml-10 text-xl">
            Removed from {chosenCollection.title}
          </p>
        </motion.div>
    </div>
  );
}
