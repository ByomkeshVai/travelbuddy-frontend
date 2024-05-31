"use client";
import { Button, Input } from "@nextui-org/react";
import TravelPageCard from "./TravelPageCard";
import { SiTripdotcom } from "react-icons/si";
import { useRouter } from "next/navigation";
import { SearchIcon } from "../components/SearchIcon";
import { useGetAllTripQuery } from "@/app/redux/api/TripRedux/TripApi";
import React, { useEffect } from "react";
import Loading from "../components/Loading";
import { Pagination } from "antd";

const AllTravelPage = () => {
  const router = useRouter();
  const [filters, setFilters] = React.useState({
    destination: "",
    startDate: "",
    endDate: "",
    type: "",
    description: "",
    page: 1,
    limit: 10,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
      page: 1,
    }));
  };

  const handlePageChange = (page, pageSize) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
      limit: pageSize,
    }));
  };

  const { data: allTrips, isLoading, refetch } = useGetAllTripQuery(filters);

  useEffect(() => {
    // refetch data when filters change
    refetch();
  }, [filters, refetch]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="flex items-center">
        <Input
          isClearable
          radius="lg"
          placeholder="Type to search..."
          name="description"
          value={filters.description}
          onChange={handleInputChange}
        />
        <SearchIcon className="text-xl text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
      </div>
      <div className="flex space-x-4">
        <Input
          placeholder="Destination"
          name="destination"
          value={filters.destination}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Start Date"
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleInputChange}
        />
        <Input
          placeholder="End Date"
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Type"
          name="type"
          value={filters.type}
          onChange={handleInputChange}
        />
      </div>
      <section className="pb-20">
        <h1 className="mb-12 text-center font-sans text-5xl font-bold">
          My Posted
          <br className="sm:hidden" />
          <span className="relative inline-flex justify-center whitespace-nowrap font-bold ml-3">
            <svg
              className="absolute -bottom-8 hidden w-2/3 text-blue-600 sm:block"
              viewBox="0 0 490 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6312 17.089C14.4676 17.089 18.4867 16.911 22.3231 16.733C23.9673 16.733 25.4288 16.555 27.073 16.555C34.0151 16.199 40.9571 15.8429 47.8992 15.4869C56.3028 15.1309 64.5237 14.5969 72.9272 14.2408C84.8018 13.5288 96.6764 12.9948 108.551 12.2827C111.291 12.1047 114.032 12.1047 116.772 11.9267C123.714 11.5707 130.656 11.2147 137.598 11.0366C144.54 10.6806 151.482 10.3246 158.424 10.1466C161.165 9.96859 163.905 9.79058 166.645 9.79058C177.606 9.43455 188.75 9.07853 199.712 8.72251C206.471 8.5445 213.23 8.36649 220.172 8.01047C222.913 8.01047 225.47 7.83246 228.211 7.83246C238.806 7.65445 249.585 7.47644 260.181 7.29843C270.776 7.12042 281.19 6.94241 291.785 6.7644C294.526 6.7644 297.266 6.7644 300.189 6.7644C307.131 6.7644 313.89 6.7644 320.832 6.7644C331.611 6.7644 342.207 6.7644 352.985 6.58639C356.456 6.58639 359.927 6.58639 363.398 6.58639C370.706 6.58639 378.013 6.58639 385.321 6.58639C385.869 6.58639 386.6 6.58639 387.148 6.58639C370.706 6.7644 354.081 6.94241 337.64 7.29843C330.698 7.47644 323.938 7.47644 316.996 7.65445C314.073 7.65445 310.967 7.65445 308.044 7.83246C297.997 8.01047 288.132 8.36649 278.084 8.5445C266.575 8.90052 255.065 9.07853 243.556 9.43455C241.547 9.43455 239.72 9.61256 237.71 9.61256C231.499 9.96859 225.47 10.1466 219.259 10.5026C206.836 11.0366 194.414 11.5707 181.991 12.1047C180.164 12.1047 178.337 12.2827 176.51 12.4607C170.482 12.8168 164.27 13.3508 158.242 13.7068C147.281 14.4188 136.502 15.1309 125.541 15.8429C122.618 16.0209 119.512 16.377 116.589 16.555C109.647 17.089 102.705 17.623 95.763 18.335C90.4105 18.691 85.1462 19.403 79.7937 19.759C66.7294 20.649 53.8423 21.539 40.778 22.429C37.4851 22.785 34.0134 23.141 30.5422 23.497C24.7775 24.209 18.8361 24.921 13.0714 25.633C10.8665 25.811 8.66161 26.167 6.45674 26.345C4.25187 26.701 2.04699 27.057 0 27.413C2.04699 27.057 4.25187 27.057 6.45674 26.879C8.66161 26.701 10.8665 26.523 13.0714 26.345C18.8361 25.811 24.7775 25.099 30.5422 24.565C34.0134 24.209 37.4851 23.853 40.778 23.497C53.8423 22.607 66.7294 21.717 79.7937 20.827C85.1462 20.471 90.4105 19.759 95.763 19.403C102.705 18.869 109.647 18.335 116.589 17.801C119.512 17.623 122.618 17.267 125.541 17.089C136.502 16.377 147.281 15.665 158.242 14.953C164.27 14.597 170.482 14.063 176.51 13.7068C178.337 13.5288 180.164 13.3508 181.991 13.3508C194.414 12.8168 206.836 12.2827 219.259 11.7487C225.47 11.3927 231.499 11.2147 237.71 10.8587C239.72 10.6806 241.547 10.6806 243.556 10.5026C255.065 10.1466 266.575 9.96859 278.084 9.61256C288.132 9.25654 297.997 8.90052 308.044 8.72251C310.967 8.5445 314.073 8.36649 316.996 8.36649C323.938 8.18848 330.698 8.01047 337.64 7.83246C354.081 7.29843 370.706 7.12042 387.148 6.94241C386.6 6.94241 385.869 6.94241 385.321 6.94241C378.013 6.94241 370.706 6.94241 363.398 6.94241C359.927 6.94241 356.456 6.94241 352.985 6.94241C342.207 6.94241 331.611 6.94241 320.832 6.94241C313.89 6.94241 307.131 6.94241 300.189 6.94241C297.266 6.94241 294.526 6.94241 291.785 6.94241C281.19 7.12042 270.776 7.29843 260.181 7.47644C249.585 7.65445 238.806 7.65445 228.211 7.83246C225.47 8.01047 222.913 8.01047 220.172 8.01047C213.23 8.36649 206.471 8.5445 199.712 8.72251C188.75 9.07853 177.606 9.43455 166.645 9.79058C163.905 9.96859 161.165 10.1466 158.424 10.1466C151.482 10.3246 144.54 10.6806 137.598 11.0366C130.656 11.2147 123.714 11.5707 116.772 11.9267C114.032 12.1047 111.291 12.1047 108.551 12.2827C96.6764 12.9948 84.8018 13.5288 72.9272 14.2408C64.5237 14.5969 56.3028 15.1309 47.8992 15.4869C40.9571 15.8429 34.0151 16.199 27.073 16.555C25.4288 16.555 23.9673 16.733 22.3231 16.733C18.4867 16.911 14.4676 17.089 10.6312 17.089Z"
                fill="currentColor"
              />
            </svg>
            <span className="relative">Travel Plans</span>
          </span>
        </h1>
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {allTrips?.data?.map((trip) => (
            <TravelPageCard key={trip.id} trip={trip} />
          ))}
        </div>
        <Pagination
          current={filters.page}
          pageSize={filters.limit}
          total={allTrips?.totalCount}
          onChange={handlePageChange}
        />
      </section>
    </div>
  );
};

export default AllTravelPage;
