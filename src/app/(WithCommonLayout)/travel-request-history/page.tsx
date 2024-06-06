"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useGetUserAllTripQuery } from "@/app/redux/api/TripRedux/TripApi";
import Loading from "../components/Loading";
import { getCurrentUser } from "@/app/redux/api/AuthRedux/AuthSlice";
import { useAppSelector } from "@/app/redux/hook";
import { TripRequest } from "./interface";
import TravelHistoryCard from "./TravelHistoryCard";
import { useRouter } from "next/navigation";

const travelRequestHistory: React.FC = () => {
  const user = useAppSelector(getCurrentUser);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }
  const {
    data: allData,
    isLoading,
    isFetching,
    error,
  } = useGetUserAllTripQuery(user?.id);

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!allData || allData.data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="flex items-center justify-between">
      {allData.data.map((tripRequest: TripRequest) => (
        <TravelHistoryCard key={tripRequest.id} tripRequest={tripRequest} />
      ))}
    </div>
  );
};

export default travelRequestHistory;
