import React from "react";

const VoicemailComp = () => {
  return (
    <div className="mt-2">
      <div className="flex items-center">
        <i className="fi fi-rr-microphone text-slate-400 dark:text-slate-600 text-base -mb-1 mr-2"></i>
        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center">
          <i className="fi fi-sr-play -mb-1 text-slate-500 dark:text-slate-900"></i>
        </div>
        <div className="flex-1 ml-2">
          <div className="flex items-center w-full h-[4px] p-[1px] bg-slate-200 dark:bg-slate-700 rounded-md">
            <span className="w-1/2 bg-slate-400 rounded-md h-[2px]"></span>
          </div>
          <div className="flex justify-between -mb-2 mt-1 text-xs text-slate-400 dark:text-slate-500">
            <h6>1:00</h6>
            <h6>3:00</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoicemailComp;
