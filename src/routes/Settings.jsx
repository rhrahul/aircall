import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <motion.div
      className="flex flex-col justify-center items-center px-5"
      initial={{ y: "100px", scale: 0.3, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
    >
      <div className="p-5 bg-white dark:bg-slate-900 dark:text-slate-50 w-full rounded-xl">
        <label
          htmlFor="default-toggle"
          className="inline-flex relative items-center cursor-pointer"
        >
          <input
            type="checkbox"
            id="default-toggle"
            className="sr-only peer"
            onChange={(e) => {
              if (e.target.checked) {
                document.documentElement.classList.add("dark");
                document.getElementById("logo-header").src =
                  "../public/imgs/logo-light.svg";
                setIsDarkMode(true);
              } else {
                document.documentElement.classList.remove("dark");
                document.getElementById("logo-header").src =
                  "../public/imgs/logo.svg";
                setIsDarkMode(false);
              }
            }}
            checked={isDarkMode}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Let's turn off lights 💡
          </span>
        </label>
      </div>
    </motion.div>
  );
};

export default Settings;
