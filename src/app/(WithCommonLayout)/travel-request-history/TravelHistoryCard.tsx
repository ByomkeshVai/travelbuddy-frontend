"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { TripRequest } from "./interface";
import TravelRequestModal from "./TravelRequestModal/TravelRequestModal";

interface TravelHistoryCardProps {
  tripRequest: TripRequest;
}

const TravelHistoryCard: React.FC<TravelHistoryCardProps> = ({
  tripRequest,
}) => {
  if (!tripRequest || !tripRequest.trip) {
    return null;
  }

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { trip } = tripRequest;

  const { onOpen } = useDisclosure();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{trip?.destination}</p>
        <small className="text-default-500">
          {trip?.startDate} - {trip?.endDate}
        </small>
      </CardHeader>
      <CardBody className="overflow-visible py-2 ">
        <Button
          className="flex items-center justify-between"
          onPress={handleOpenModal}
        >
          <h3>Trip Status</h3>
          <h4 className="border-1 p-1 rounded-md">{tripRequest?.status}</h4>
        </Button>
        <TravelRequestModal
          tripRequest={tripRequest}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </CardBody>
    </Card>
  );
};

export default TravelHistoryCard;
