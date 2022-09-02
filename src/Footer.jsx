import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

import { Fireworks } from "@fireworks-js/react";

const FooterIcon = (props) => {
  const { iconName, className, tooltip, isActive } = props;

  const icon = isActive ? `sr-${iconName}` : `rr-${iconName}`;
  return (
    <motion.button
      className="py-5 w-6"
      type="button"
      whileTap={{ scale: 0.8 }}
      data-tip={tooltip}
      data-for="tooltip-main"
    >
      <i
        className={`fi fi-${icon} ${
          isActive && "!text-blue-600 dark:!text-blue-300"
        } text-2xl flex items-end ${className}`}
      ></i>
    </motion.button>
  );
};

const PhoneDial = (props) => {
  const dotClass =
    "w-2 h-2 flex justify-center items-center rounded-full bg-green-300 mx-1";
  const phoneBtns = [];
  for (let i = 1; i <= 3; i++) {
    phoneBtns.push(<span key={i} className={dotClass}></span>);
  }
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      data-tip={"Dial New Number"}
      data-for="tooltip-main"
      onClick={props.onClick}
      className="w-24 h-24 -mb-8 -mt-4 rounded-full bg-green-600 dark:bg-green-700 border-8 border-green-300 dark:border-green-900 flex justify-center items-center flex-wrap p-5"
    >
      <div className="flex">{phoneBtns}</div>
      <div className="flex">{phoneBtns}</div>
      <div className="flex">{phoneBtns}</div>
    </motion.button>
  );
};

const Footer = () => {
  const location = useLocation();
  const currentPath =
    location.pathname.split("/")[1] === ""
      ? "/"
      : location.pathname.split("/")[1];

  const MAX_COUNT = 15;
  const [fireWorkCount, setFireWorkCount] = useState(0);

  const links = [
    {
      name: "Activities",
      icon: "call-history",
      tooltip: "Activities",
      path: "/",
    },
    {
      name: "User",
      icon: "user",
      tooltip: "User",
      path: "user",
    },
    {
      name: "phonedial",
    },
    {
      name: "Archived",
      icon: "box",
      tooltip: "Archived",
      path: "archived",
    },
    {
      name: "Settings",
      icon: "settings",
      tooltip: "Settings",
      path: "settings",
    },
  ];
  return (
    <footer className="absolute bottom-0 right-0 w-full bg-white dark:bg-slate-900 rounded-t-3xl px-6 flex justify-between shadow-2xl shadow-slate-800/90 dark:shadow-slate-900/100">
      {fireWorkCount >= MAX_COUNT && (
        <Fireworks
          options={{ opacity: 0.4 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 99,
          }}
          className="fixed top-0 left-0 w-full h-full"
        />
      )}

      {links.map((link, index) => {
        if (link.name === "phonedial") {
          return (
            <PhoneDial
              onClick={() => setFireWorkCount(fireWorkCount + 1)}
              key={index}
            />
          );
        }
        return (
          <Link to={link.path} key={index}>
            <FooterIcon
              className="text-slate-900 dark:text-slate-500"
              iconName={link.icon}
              tooltip={link.tooltip}
              isActive={currentPath === link.path}
            />
          </Link>
        );
      })}
    </footer>
  );
};

export default Footer;
