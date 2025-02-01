import { motion } from "framer-motion";

import React, {useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function Success({
  chosenCollection,
  setJustAdded
}: {
  chosenCollection:
    {
        collection_id: number;
        title: string;
        user_id: number;
        description: string;
        created_at: string;
      };
    setJustAdded: React.Dispatch<React.SetStateAction<boolean>>
}) {
  // const [alert, setAlert] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setJustAdded(false);
    }, 3000);
  }, [setJustAdded]);

  return (
    <div className="flex justify-center p-5">
        <motion.div
          className=" bg-white flex items-center shadow-lg rounded-lg"
          animate={{ y: -220 }}
          initial={{ y: 0 }}
        >
          <motion.div animate={{ scale: 1 }} initial={{ scale: 0 }}>
            <FontAwesomeIcon
              className="w-24 h-24 m-5"
              color="green"
              icon={faCheckCircle}
            />
          </motion.div>
          <p className="text-center sm:mb-0 ml-10 mr-5 text-xl">
            Added To {chosenCollection.title}
          </p>
        </motion.div>
    </div>
  )
}
