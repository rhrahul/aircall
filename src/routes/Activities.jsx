import React, { useEffect, useMemo } from "react";
import ActivityListItem from "../components/ActivityListItem.jsx";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

import { getDataFromAPI, postDataToAPI } from "../utils/apiCalls.js";

import LoadingIcon from "../utils/LoadingIcon.jsx";
import NoDataAvailable from "../components/NoDataAvailable.jsx";
import { Link } from "react-router-dom";

const Activities = (props) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { isArchivedPage } = props;

  const updateActivity = async (id, postData) => {
    try {
      const items = [...data];
      let item = {
        ...items[data.findIndex((activity) => activity.id === id)],
        ...postData,
      };
      items[data.findIndex((activity) => activity.id === id)] = item;
      let res = await postDataToAPI(
        "https://aircall-job.herokuapp.com/activities/" + id,
        postData
      );
      setData(items);
    } catch (err) {
      alert(err);
    }
  };

  const unArchiveAll = async () => {
    try {
      await getDataFromAPI("https://aircall-job.herokuapp.com/reset");
      setData([]);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await getDataFromAPI(
          "https://aircall-job.herokuapp.com/activities"
        );
        setData(res);
        setLoading(false);
      } catch (err) {
        alert(err);
      }
    }
    fetchData();
  }, []);

  const isDataAvailable =
    data.filter((val) => val.is_archived === isArchivedPage).length > 0;

  return (
    <div className="flex flex-col justify-center items-center px-5 relative">
      {loading ? (
        <LoadingIcon />
      ) : isDataAvailable ? (
        <AnimatePresence mode="popLayout">
          {isArchivedPage && (
            <>
              <motion.button
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: "10px" }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => unArchiveAll()}
                className="fixed z-50 top-[100px] flex items-center p-2 pr-4 bg-white dark:bg-slate-900 dark:text-slate-50 rounded-full mt-3 mb-4 shadow-lg shadow-slate-400/20 dark:shadow-slate-900/20"
              >
                <div className="flex items-center justify-center h-10 w-10 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <i
                    className={`fi fi-rr-folder-upload text-lg -mb-1 text-orange-600 dark:text-orange-400`}
                  ></i>
                </div>
                <span className="ml-2 text-sm font-bold">
                  {"Unarchive All"}
                </span>
              </motion.button>
              <div className="mb-14"></div>
            </>
          )}
          {data.map((item) => {
            return (
              item.is_archived === isArchivedPage && (
                <Link
                  to={`/activity/${item.id}`}
                  key={item.id}
                  className="w-full"
                >
                  <ActivityListItem
                    data={item}
                    isArchivedPage={isArchivedPage}
                    updateActivity={(id) => {
                      updateActivity(id, {
                        is_archived: !isArchivedPage,
                      });
                    }}
                  />
                </Link>
              )
            );
          })}
        </AnimatePresence>
      ) : (
        <NoDataAvailable isArchivedPage={isArchivedPage} />
      )}
    </div>
  );
};

Activities.defaultProps = {
  isArchivedPage: false,
};

export default Activities;
