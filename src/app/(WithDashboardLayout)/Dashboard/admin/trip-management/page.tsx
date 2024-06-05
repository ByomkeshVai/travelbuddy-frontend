"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import {
  useDeleteSingleUserAllTripMutation,
  useGetAllTripQuery,
} from "@/app/redux/api/TripRedux/TripApi";
import Loading from "@/app/(WithCommonLayout)/components/Loading";
import Image from "next/image";
import { DeleteIcon } from "@/app/(WithCommonLayout)/components/DeleteIcon";
import Swal from "sweetalert2";

const TripsPage = () => {
  const [filters, setFilters] = React.useState({
    destination: "",
    startDate: "",
    endDate: "",
    type: "",
    description: "",
    page: 1,
    limit: 10,
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
      page: 1,
    }));
  };

  const handlePageChange = (page: any, pageSize: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
      limit: pageSize,
    }));
  };

  const { data: allTrip, isLoading } = useGetAllTripQuery(filters);

  const [deleteTrip] = useDeleteSingleUserAllTripMutation();

  if (isLoading) {
    return <Loading />;
  }

  const handleDeleteTrip = async (tripId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteTrip(tripId).unwrap();
        Swal.fire("Deleted!", "Your trip has been deleted.", "success");
      } catch (error) {
        Swal.fire("Failed!", "There was a problem deleting the trip.", "error");
      }
    }
  };

  return (
    <Table aria-label="Trips table">
      <TableHeader>
        <TableColumn>Destination</TableColumn>
        <TableColumn>Images</TableColumn>
        <TableColumn>Start Date</TableColumn>
        <TableColumn>End Date</TableColumn>
        <TableColumn>Type</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody>
        {allTrip?.data?.map((trip: any) => (
          <TableRow key={trip.id}>
            <TableCell>{trip.destination}</TableCell>
            <TableCell>
              <Image
                src={trip.photos[0]}
                alt={trip.destination}
                width={60}
                height={60}
              />
            </TableCell>
            <TableCell>{trip.startDate}</TableCell>
            <TableCell>{trip.endDate}</TableCell>
            <TableCell>{trip.type}</TableCell>
            <TableCell>
              <Tooltip color="danger" content="Delete trip">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon onClick={() => handleDeleteTrip(trip.id)} />
                </span>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TripsPage;
