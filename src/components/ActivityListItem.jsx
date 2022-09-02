import React, { useMemo } from "react";
import Moment from "react-moment";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import VoicemailComp from "../utils/VoicemailComp.jsx";

import {
  getDirection,
  getLeftIconBackColor,
  getLeftIconColor,
} from "../utils/helper.js";

const ActivityListItem = (props) => {
  const { data, updateActivity, isArchivedPage } = props;

  const archiveIconMotion = {
    hover: { opacity: 1, x: 0 },
    initial: { opacity: 0, x: "100%" },
  };
  const dateTimeMotion = {
    hover: { opacity: 0 },
    initial: { opacity: 1 },
  };
  const activityListItemMotion = {
    initial: { opacity: 0, y: "-100px" },
    show: { opacity: 1, y: 0 },
    hover: { scale: 1.04 },
  };

  //  Left Icon , color and background color
  const direction = useMemo(
    () => getDirection(data),
    [data.direction, data.call_type]
  );
  const leftIconBackColor = useMemo(
    () => getLeftIconBackColor(direction),
    [direction]
  );
  const leftIconColor = useMemo(() => getLeftIconColor(direction), [direction]);
  const displayMobileNumber =
    data.direction === "inbound" ? data.from : data.to;
  const textBeneathMobileNo =
    direction === "missed"
      ? `tried to call on ${data.to === null ? data.via : data.to}`
      : direction === "incoming"
      ? `called to ${data.to === null ? data.via : data.to}`
      : `called by ${data.from === null ? data.via : data.from}`;

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      variants={activityListItemMotion}
      layout
      layoutId={data.id}
      animate="show"
      exit={{ scale: 0.7, opacity: 0 }}
      className="relative group bg-white dark:bg-slate-900 dark:text-white text-left rounded-xl p-2 mb-3 w-full overflow-hidden"
    >
      <div className="flex justify-between items-center">
        {/* 
      //----------------------------- 
      // Leftside Icon
      //----------------------------- 
      */}
        <div
          className={`flex w-12 h-12 ${leftIconBackColor} rounded-lg items-center justify-center`}
        >
          <i
            className={`fi fi-rr-call-${direction} text-2xl -mb-2 ${leftIconColor}`}
          ></i>
        </div>
        {/* 
      //----------------------------- 
      // Number and other details
      //----------------------------- 
      */}
        <div className="flex flex-1 max-w-[58%] flex-col items-start mx-3">
          <h2
            className={`text-lg font-black ${
              direction === "missed" && "text-red-500"
            }`}
          >
            {displayMobileNumber}
          </h2>
          <h3 className="text-xs text-left w-full text-slate-400 dark:text-slate-500 truncate">
            {textBeneathMobileNo}
          </h3>
        </div>
        {/* 
      //----------------------------- 
      // Date & Time 
      //----------------------------- 
      */}
        <motion.div
          variants={dateTimeMotion}
          className="flex flex-col items-end mr-1 text-slate-400 dark:text-slate-500 text-right text-xs"
        >
          <h6>
            <Moment format="DD MMM">{new Date(data.created_at)}</Moment>
          </h6>
          <h6 className="font-bold">
            <Moment format="HH:MM A">{new Date(data.created_at)}</Moment>
          </h6>
        </motion.div>
        {/* 
      //----------------------------- 
      // Archive/Unarchive Icon 
      //----------------------------- 
      */}
        <motion.div
          onClick={(e) => {
            e.preventDefault();
            updateActivity(data.id);
          }}
          variants={archiveIconMotion}
          className="absolute right-2 w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center"
        >
          <i
            className={`fi fi-${
              isArchivedPage ? "rr-folder-upload" : "rr-box"
            } text-2xl -mb-2 text-orange-600 dark:text-orange-400`}
          ></i>
        </motion.div>
      </div>
      {/*
      //-----------------------------
      // Voicemail
      //-----------------------------
      */}
      {data.call_type === "voicemail" && <VoicemailComp />}
    </motion.div>
  );
};

export default ActivityListItem;
