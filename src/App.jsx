import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

import Activities from "./routes/Activities.jsx";
import User from "./routes/User.jsx";
import Archived from "./routes/Archived.jsx";
import Settings from "./routes/Settings.jsx";
import ActivitySingle from "./routes/ActivitySingle.jsx";

const App = () => {
  return (
    <div className="relative container bg-slate-100 dark:bg-slate-800">
      <Header />
      <div className="fireworks-container"></div>

      <div className="bg-gradient-to-b from-slate-100 dark:from-slate-800 z-50 to-transparent h-16 absolute w-full"></div>
      <div className="py-5 pt-10 h-[90%] overflow-x-auto pb-20">
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activity/:activityId" element={<ActivitySingle />} />
          <Route path="/user" element={<User />} />
          <Route path="/archived" element={<Archived />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
