import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import { BsCalendarDate } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";

const TravelPageCard = ({ trip }: any) => {
  return (
    <div className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:scale-105 ">
      <div className="block h-full w-full">
        <div className="w-full bg-white p-4">
          <p className="text-md font-medium text-indigo-500 flex items-center gap-1">
            <FaLocationDot />
            {trip?.destination}
          </p>
          <Image
            src={trip?.photos[0]}
            width={300}
            height={100}
            loading="lazy"
            alt="Picture of the author"
          />

          <p className="text-md font-light text-gray-400">
            {trip?.description}
          </p>
          <div className="justify-between mt-4 flex flex-wrap items-center">
            <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600 flex items-center gap-2">
              <BsCalendarDate /> <h3>{trip?.startDate}</h3>
            </div>
            <Button color="primary">
              <Link href={`all-travel/${trip?.id}`} className="text-slate-900">
                <h3 className="text-slate-50 font-bold">View Details</h3>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPageCard;
