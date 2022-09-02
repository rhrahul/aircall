import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion/dist/framer-motion";
import LoadingIcon from "../utils/LoadingIcon.jsx";
import { getDataFromAPI, postDataToAPI } from "../utils/apiCalls.js";
import Moment from "react-moment";
import ReactTooltip from "react-tooltip";
import VoicemailComp from "../utils/VoicemailComp.jsx";

const ActivitySingle = (props) => {
  let navigate = useNavigate();
  let params = useParams();
  const itemId = params.activityId;
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  const updateActivity = async (id, postData) => {
    try {
      let res = await postDataToAPI(
        "https://aircall-job.herokuapp.com/activities/" + id,
        postData
      );
      data.is_archived = !data.is_archived;
      if (data.is_archived) {
        navigate("/archived");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await getDataFromAPI(
          "https://aircall-job.herokuapp.com/activities/" + itemId
        );
        setData(res);
        setLoading(false);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, [itemId]);

  const getDisplayNumber = (data) => {
    if (data) {
      return data.direction === "inbound" ? data.from : data.to;
    }
  };
  const getDirection = (data) => {
    if (data) {
      return data.direction === "inbound" ? "Incoming Call" : "Outgoing Call";
    }
  };

  const makeHumanReadable = (num, singular) => {
    return num > 0
      ? num + (num === 1 ? ` ${singular}, ` : ` ${singular}s, `)
      : "";
  };

  const getCallDuration = (data) => {
    if (data) {
      const seconds = Math.floor(data.duration % 60);
      const minutes = Math.floor((data.duration % 3600) / 60);
      const hours = Math.floor((data.duration % (3600 * 24)) / 3600);

      const secondsStr = makeHumanReadable(seconds, "second");
      const minutesStr = makeHumanReadable(minutes, "minute");
      const hoursStr = makeHumanReadable(hours, "hour");

      return `${hoursStr}${minutesStr}${secondsStr}`.replace(/,\s*$/, "");
    }
  };

  const getEmployeeName = (data) => {
    if (data) {
      return data.direction === "inbound"
        ? data.to === null
          ? "N/A"
          : data.to
        : data.from
        ? data.from
        : "N/A";
    }
  };

  const callDuration = useMemo(() => getCallDuration(data), [data]);

  const getOfficeLocation = (data) => {
    if (data) {
      return data.via === null ? "N/A" : data.via;
    }
  };

  const btns = [
    {
      name: "Message",
      icon: "fi-rr-comment-quote",
      backColor: "bg-green-100 dark:bg-green-900",
      color: "text-green-600 dark:text-green-400",
      onClick: () => {},
    },
    {
      name: "Call Back",
      icon: "fi-rr-phone-call",
      backColor: "bg-blue-100 dark:bg-blue-900",
      color: "text-blue-600 dark:text-blue-400",
      onClick: () => {},
    },
    {
      name: data && data.is_archived ? "Unarchive" : "Archive",
      icon: data && data.is_archived ? "fi-rr-folder-upload" : "fi-rr-box",
      backColor: "bg-gray-100 dark:bg-gray-800",
      color: "text-gray-600 dark:text-gray-400",
      onClick: async () => {
        await updateActivity(data.id, { is_archived: !data.is_archived });
      },
    },
  ];
  const renderBtns = () => {
    return btns.map((btn, index) => {
      return (
        <motion.button
          key={index}
          data-tip={btn.name}
          data-for="tooltip-activity"
          whileTap={{ scale: 0.9 }}
          onClick={btn.onClick}
          className={`flex items-center justify-center h-16 w-16 rounded-full mx-3 ${btn.backColor} ${btn.color} `}
        >
          <i className={`fi ${btn.icon} text-2xl -mb-2`}></i>
        </motion.button>
      );
    });
  };
  const iconClass =
    "flex items-center justify-center h-16 w-16 rounded-full bg-slate-200 mx-3";
  const isMissedCall =
    data &&
    data.direction === "inbound" &&
    (data.call_type === "missed" || data.call_type === "voicemail");
  return (
    <div className="flex flex-col justify-center items-center px-5">
      {loading ? (
        <LoadingIcon />
      ) : data !== null ? (
        <motion.div
          layoutlayoutId={itemId}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group bg-white dark:bg-slate-900 dark:text-slate-200 text-left rounded-xl p-5 mb-3 w-full overflow-hidden"
        >
          <ReactTooltip
            id="tooltip-activity"
            effect="solid"
            className="!p-2 !rounded-lg dark:!bg-slate-200 dark:!text-black"
            arrowColor="transparent"
          />
          <h3
            className={`text-center text-2xl font-extrabold ${
              isMissedCall ? "text-red-500" : ""
            }`}
          >
            {getDisplayNumber(data)}
          </h3>
          <p className="text-center mt-1 text-slate-400 dark:text-slate-600">
            <Moment format="DD MMMM YYYY, HH:MM A">
              {new Date(data.created_at)}
            </Moment>
          </p>
          <div className="flex items-center justify-center my-6">
            {renderBtns()}
          </div>
          {data.call_type === "voicemail" && (
            <div className="mb-6">
              <VoicemailComp />
            </div>
          )}
          <div className="flex items-center justify-between py-4 border-y border-slate-100 dark:border-slate-800">
            <p className="text-base text-left">{getDirection(data)}</p>
            <p
              className={`text-sm text-right ${isMissedCall && "text-red-500"}`}
            >
              {isMissedCall || data.call_type === "missed"
                ? "Missed"
                : callDuration}
            </p>
          </div>
          <div className="flex flex-col mt-8">
            <p className="text-center mb-3 text-slate-400 dark:text-slate-600">
              Handled By,
            </p>
            <div>
              <div className="flex items-center mb-2">
                <div className="flex items-center justify-center bg-purple-100 dark:bg-purple-900 h-10 w-10 rounded-full">
                  <i className="fi fi-rr-user text-purple-600 dark:text-purple-400 text-xl -mb-1"></i>
                </div>
                <p className="ml-4 text-base font-bold">
                  {getEmployeeName(data)}
                </p>
              </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center bg-yellow-100 dark:bg-yellow-900 h-10 w-10 rounded-full">
                  <i className="fi fi-rr-phone-office text-yellow-600 dark:text-yellow-400 text-xl -mb-1"></i>
                </div>
                <p className="ml-4 text-base font-bold">
                  {getOfficeLocation(data)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <p>Oops!</p>
      )}
    </div>
  );
};

export default ActivitySingle;
