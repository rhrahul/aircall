import React from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { Link } from "react-router-dom";

const NoDataAvailable = (props) => {
  const { isArchivedPage } = props;
  return (
    <motion.div
      initial={{ y: "-100px" }}
      animate={{ y: 0 }}
      className="flex flex-col items-center"
    >
      <p className="text-base dark:text-slate-50">
        Oops! No {isArchivedPage ? "archives" : "activities"} found.
      </p>
      <Link to={isArchivedPage ? "/" : "/archived"}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="flex items-center p-2 pr-4 bg-white dark:bg-slate-900 rounded-full mt-3"
        >
          <div className="flex items-center justify-center h-10 w-10 bg-orange-100 dark:bg-orange-900 rounded-full">
            <i
              className={`fi fi-${
                isArchivedPage ? "rr-call-history" : "rr-box"
              } text-lg -mb-1 text-orange-600 dark:text-orange-400`}
            ></i>
          </div>
          <span className="ml-2 text-sm font-bold dark:text-slate-50">
            {isArchivedPage ? "Go to Activities" : "Go to Archive"}
          </span>
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default NoDataAvailable;
