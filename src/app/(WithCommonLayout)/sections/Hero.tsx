"use client";
import heroAnimation from "../../../../public/hero-section.json";
import { useLottie } from "lottie-react";
import { HiSearch } from "react-icons/hi";

const Hero = () => {
  const options = {
    animationData: heroAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="mx-auto h-full px-4 py-28 md:py-40 sm:max-w-xl md:max-w-full md:px-24 lg:px-8">
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <div className="">
          <div className="lg:max-w-xl lg:pr-5">
            <p className="flex text-sm uppercase text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 inline h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                  clip-rule="evenodd"
                />
              </svg>
              Make Your Travel Enjoyable with The Buddy
            </p>
            <h2 className="mb-6 max-w-lg text-5xl font-bold leading-snug tracking-tight text-white sm:text-7xl sm:leading-snug">
              Find Your Perfect Travel
              <span className="my-1 inline-block border-b-8 border-white bg-[#1D4ED8] px-4 font-bold text-white">
                Buddy!
              </span>
            </h2>
            <p className="text-base text-gray-400">
              We allows users to share their travel plans, search for trips, and
              find like-minded individuals to join them.
            </p>
          </div>
          <div className="mx-auto mt-12 mb-2 max-w-xl sm:rounded-xl sm:border sm:border-gray-100 sm:bg-white  sm:shadow">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center justify-between gap-1 text-gray-500 sm:w-full">
                <input
                  name="email"
                  id="email"
                  placeholder="Find Your Trip"
                  className="w-full cursor-text rounded-xl border-2 py-4 pr-4 pl-3 text-base outline-none transition-all duration-200 ease-in-out sm:border-0 focus:border-transparent focus:ring"
                  required
                />
                <button
                  type="submit"
                  className="group flex items-center justify-center rounded-xl bg-blue-700 px-6 py-4 text-white transition"
                >
                  <HiSearch size={24} />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center md:flex-row">
            <a
              href="/"
              className="mb-3 inline-flex h-12 w-full items-center justify-center rounded bg-blue-700 px-6 font-medium tracking-wide text-white shadow-md transition md:mr-4 md:mb-0 md:w-auto focus:outline-none hover:bg-blue-800"
            >
              Share Your Trip{" "}
            </a>
            <a
              href="/"
              aria-label=""
              className="group inline-flex items-center font-semibold text-white"
            >
              Watch how it works
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:translate-x-2 ml-4 h-6 w-6 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="relative hidden lg:ml-32 lg:block lg:w-1/2">{View}</div>
      </div>
    </div>
  );
};

export default Hero;
