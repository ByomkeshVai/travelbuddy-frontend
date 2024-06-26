"use client";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { BsCalendarDate } from "react-icons/bs";
const SingleTravelCard = () => {
  return (
    <div className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:scale-105 ">
      <div className="block h-full w-full">
        <div className="w-full bg-white p-4">
          <p className="text-md font-medium text-indigo-500 flex items-center gap-1">
            <FaLocationDot />
            Dhaka, Bangladesh
          </p>
          <p className="mb-2 text-xl font-medium text-gray-800">
            Getting to know the Ice Factory Pattern
          </p>
          <Image
            src="/public/travel1.jpg"
            width={300}
            height={100}
            loading="lazy"
            alt="Picture of the author"
          />

          <p className="text-md font-light text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel
            neque ipsam?
          </p>
          <div className="justify-starts mt-4 flex flex-wrap items-center">
            <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600 flex items-center gap-2">
              <BsCalendarDate /> <h3>21 May 2024</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTravelCard;
