/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Weather from "../Weather/Weather";
import RecommendedFreind from "../recommendedFreind/recommendedFreind";
import Register from "../Rigester/index";
import LoginPage from "../Login/index";
import Post from "../Post/Post";
import WelcomePage from "../welcome page/welcomepage";
import Home from "../Home/Home";
import NavBarPost from "../Navbar/NavBarPost";
import Stories from "../Stories/Stories";

import Loader from "../Loader/Loader";
import Profile from "../Profile/Profile";
import Socket from "../socket/Socket";
import Explore from "../Explore/Explore";
import Admin from "../AdminDashboard/Admin";
export default function CustomRoute() {
  return (
    <>
 
{/* <Socket/> */}
 
      <Routes>
        <Route path="/users/register" element={<Register />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/" element={<WelcomePage />} />

        <Route path="/home" element={<Home />} />
 
        <Route path="/admin" element={<Admin/>} />
 
        <Route path="/messages" element={<Socket/>} />
 
      </Routes>
      {/* <Weather/> */}
      {/* <Stories/> */}
      {/* <RecommendedFreind/> */}
      {/* <WelcomePage/>  */}
      {/* <NavBar/> */}
      {/* <NavBarPost/> */}

      {/* <Profile/> */}

      {/* <LoginPage /> */}

      {/* <Post/>   */}
    </>
  );
}
