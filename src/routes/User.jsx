import React from "react";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

const User = () => {
  return (
    <motion.div
      className="flex flex-col justify-center items-center px-5"
      initial={{ y: "100px", scale: 0.3, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
    >
      <div className="p-5 bg-white dark:bg-slate-900 dark:text-slate-50 w-full rounded-xl">
        <div className="flex items-center justify-between border-b pb-5 border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700">
            <img src="../../public/imgs/profile.png" className="w-full -mb-2" />
          </div>
          <div className="ml-5 flex-1">
            <h2 className="text-xl font-bold">Rahul Pipaliya</h2>
            <a
              href="mailto:pipaliyarahul96@gmail.com"
              className="text-sm text-slate-400"
            >
              pipaliyarahul96@gmail.com
            </a>
          </div>
        </div>
        <p className="mt-5">
          I'm Ambitious Software Developer; I love Designing and Developing new
          stuff, and this assignment was one of those; I truly enjoyed it, and
          as always, I learned a lot of things. I've coded one easter egg 😜
          (Good luck finding that). Hopefully, you will enjoy it.
        </p>
      </div>
    </motion.div>
  );
};

export default User;
