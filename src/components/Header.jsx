import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5"; // Close icon
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json",
        },
      })
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
      });
  };

  return (
    <header className="flex items-center justify-between p-4 shadow-sm bg-white relative">
      <div className="flex items-center">
        <div onClick={() => navigate("/")} className="flex items-center cursor-pointer">
          <img src={logo} alt="logo" className="h-10 w-auto" />
          &nbsp;
          <p className="font-semibold">Go Buddy</p>
        </div>
      </div>
      <div className="relative">
        {user?.email ? (
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate("/create-trip")} className="p-2  text-gray-800 border border-gray-800 rounded-full shadow-sm transition cursor-pointer">
              + Create Trip
            </button>
            <button onClick={() => navigate("/my-trips")} className="p-2  text-gray-800 border border-gray-800 rounded-full shadow-sm transition cursor-pointer">
              My Trips
            </button>
            <div className="relative">
              <img
                src={user?.picture}
                alt="User"
                className="h-[35px] w-[35px] rounded-full object-cover cursor-pointer"
                referrerPolicy="no-referrer"
                onClick={() => setShowLogout(!showLogout)}
              />
              {showLogout && (
                <div className="absolute right-0 mt-2 w-32 bg-white border shadow-md rounded-md cursor-pointer">
                  <button
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      navigate("/");
                    }}
                    className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            className="p-2 bg-[#f56551] text-white m-2 rounded-md shadow-sm transition cursor-pointer"
            onClick={() => setOpenDialog(true)}
          >
            Sign In
          </button>
        )}
      </div>

      {/* Dialog Box */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={() => setOpenDialog(false)}
            >
              <IoClose size={24} />
            </button>

            {/* Logo and Title */}
            <div className="flex flex-col ">
              <div className="flex items-center">
              <img src={logo} alt="logo" className="h-10 w-auto" /> &nbsp;
              <p>Go Buddy</p>
              </div>
              <h2 className="text-lg font-bold mt-4">Sign In With Google</h2>
              <p className="text-gray-500  text-sm mt-1">
                Sign in to the App with Google authentication securely
              </p>
            </div>

            {/* Sign In Button */}
            <button
              className="w-full mt-5 flex items-center justify-center gap-3 bg-black text-white p-3 rounded-md shadow-md hover:bg-gray-800 cursor-pointer"
              onClick={() => login()}
            >
              <FcGoogle className="h-6 w-6" />
              <span>Sign In With Google</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
