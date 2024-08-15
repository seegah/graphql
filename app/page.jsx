"use client";

import React from "react";
import { useGlobalContext } from "./context/globalState";

export default function Home() {
  const {
    login,
    emailOrUsername,
    setEmailOrUsername,
    password,
    setPassword,
    errorLogin,
  } = useGlobalContext();
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white text-black rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-3xl">
        <div className="md:w-1/2 bg-[#FF9B05] text-white p-8 rounded-t-lg md:rounded-tr-none md:rounded-l-lg">
          <h2 className="text-2xl font-bold mt-6 mb-4">
            Welcome to Your Z01 Profile
          </h2>
          <p className="text-sm mt-8 mb-10">
            This is your profile page where you can view and manage your
            personal information, achievements, and more. Log in to get started
            and access your personalized dashboard.
          </p>
          <div className="mt-8 p-4 bg-white rounded-lg text-black">
            <h3 className="text-lg font-bold mb-4">
              Track progress and achievements
            </h3>
            <p className="text-sm">
              Keep an eye on your achievements and statistics with our
              interactive charts and graphs.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 p-8">
          <img
            src="/logo.svg"
            alt="logo"
            className="mb-6 h-24 mx-auto md:h-32 md:ml-20"
          />
          <form onSubmit={login} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email/Username
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#FF9B05] focus:outline-none"
                  placeholder="Email or username"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 101 101"
                  id="user"
                  className="absolute inset-y-0 right-3 w-7 h-7 fill-gray-400 top-3"
                >
                  <path d="M50.4 54.5c10.1 0 18.2-8.2 18.2-18.2S60.5 18 50.4 18s-18.2 8.2-18.2 18.2 8.1 18.3 18.2 18.3zm0-31.7c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4S37 43.7 37 36.3s6-13.5 13.4-13.5zM18.8 83h63.4c1.3 0 2.4-1.1 2.4-2.4 0-12.6-10.3-22.9-22.9-22.9H39.3c-12.6 0-22.9 10.3-22.9 22.9 0 1.3 1.1 2.4 2.4 2.4zm20.5-20.5h22.4c9.2 0 16.7 6.8 17.9 15.7H21.4c1.2-8.9 8.7-15.7 17.9-15.7z"></path>
                </svg>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="relative mt-1 mb-4">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#FF9B05] focus:outline-none"
                  placeholder="••••••••"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-y-0 right-3 w-5 h-5 fill-gray-400 top-3"
                  id="key"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.896 10.163a4.071 4.071 0 0 1-4.069-4.065 4.071 4.071 0 0 1 4.07-4.065 4.071 4.071 0 0 1 4.068 4.065 4.071 4.071 0 0 1-4.069 4.065M12.518.151C10.265.643 8.45 2.46 7.948 4.709a6.093 6.093 0 0 0 .985 4.93L.298 18.265a1.017 1.017 0 0 0 1.438 1.437l.732-.73.69.69a1.017 1.017 0 0 0 1.44 0 1.014 1.014 0 0 0 0-1.438l-.691-.69 2.013-2.011.71.71a1.016 1.016 0 1 0 1.438-1.437l-.71-.71 3.016-3.013c1.341.949 3.077 1.379 4.92.966 2.247-.502 4.061-2.314 4.554-4.561a6.115 6.115 0 0 0-7.33-7.327"
                  ></path>
                </svg>
              </div>
            </div>
            {errorLogin && (
              <div className="text-red-500 text-sm">{errorLogin}</div>
            )}
            <button
              type="submit"
              className="w-full py-3 text-white bg-[#FF9B05] hover:bg-[#FFC46B] hover:text-black rounded-lg font-semibold"
            >
              Sign in
            </button>
            <p className="text-xs mt-4 text-center md:text-left">
              Copyright 2024 &copy;{" "}
              <span className="uppercase font-semibold">Sigasha Honey</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
