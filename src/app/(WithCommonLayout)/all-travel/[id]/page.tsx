"use client";
import { useGeSingleTripQuery } from "@/app/redux/api/TripRedux/TripApi";
import { FaLocationDot } from "react-icons/fa6";

import Image from "next/image";
import Loading from "../../components/Loading";
type TProps = {
  params: { id: string };
};

const SingleTravelDetailsPage = ({ params }: TProps) => {
  const { data: singleTrips, isLoading } = useGeSingleTripQuery(params.id);

  if (isLoading) {
    <Loading />;
  }

  return (
    <div className="font-sans bg-gray-700">
      <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="bg-gray-800 px-4 py-10 rounded-xl">
              <Image
                width={200}
                height={200}
                src={singleTrips?.data?.photos[0]}
                alt="Product"
                className="w-4/5 rounded object-cover mx-auto"
              />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-6 mx-auto">
              <div className="bg-gray-800 rounded-xl p-4">
                <Image
                  width={200}
                  height={200}
                  src={singleTrips?.data?.photos[0]}
                  alt="Product2"
                  className="w-20 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-3xl font-semibold text-white">
              <div className="flex items-center gap-3">
                <FaLocationDot />
                {singleTrips?.data?.destination}
              </div>
            </h2>

            <div className="flex space-x-2 mt-4">
              <svg
                className="w-5 fill-yellow-300"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-yellow-300"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-yellow-300"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-yellow-300"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-[#CED5D8]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <h4 className="text-white text-base">500 Reviews</h4>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                type="button"
                className="min-w-[200px] px-4 py-3 bg-yellow-300 hover:bg-yellow-400 text-black text-sm font-semibold rounded"
              >
                Travel Request
              </button>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white">
                About the Trip
              </h3>
              <p className="space-y-3 list-disc mt-4 pl-4 text-sm text-white">
                {singleTrips?.data?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTravelDetailsPage;
