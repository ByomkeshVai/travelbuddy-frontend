"use client";
import { useGeSingleTripQuery } from "@/app/redux/api/TripRedux/TripApi";
import { FaLocationDot } from "react-icons/fa6";

import Image from "next/image";
import Loading from "../../components/Loading";
import Link from "next/link";
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

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                type="button"
                className="min-w-[200px] px-4 py-3 bg-yellow-300 hover:bg-yellow-400 text-black text-sm font-semibold rounded"
              >
                <Link
                  href={`/all-travel/${singleTrips?.data?.id}/travel-request`}
                >
                  Travel Request
                </Link>
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
