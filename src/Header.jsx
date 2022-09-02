import React from "react";
import { useLocation } from "react-router-dom";
import Logo from "../public/imgs/logo.svg";

const Header = () => {
  const location = useLocation();
  const currentPath =
    location.pathname.split("/")[1] === ""
      ? "activities"
      : location.pathname.split("/")[1];
  return (
    <header>
      <div className="flex items-end justify-between">
        <img id="logo-header" src={Logo} className="h-10 pl-5 mt-4" />
        <div className="w-1/2 bg-white dark:bg-slate-900 dark:text-white self-stretch flex items-end rounded-bl-2xl	pb-2 pl-3">
          <h2 className="text-lg font-bold capitalize">{currentPath}</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
