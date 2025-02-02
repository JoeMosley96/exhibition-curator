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
      setJustRemoved(false);
      setSaved(false);
    }, 3000);
  }, [setJustRemoved, setSaved]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <div className="flex justify-center items-center">
      <motion.div
        className="fixed top-5 px-8 h-20 bg-white shadow-lg rounded-lg flex justify-center items-center"
        animate={{ y: 0 }}
        initial={{ y: -220 }}
      >
        <p className="text-black text-xl">
          Removed from {chosenCollection.title}
        </p>
      </motion.div>
    </div>
  );
}
