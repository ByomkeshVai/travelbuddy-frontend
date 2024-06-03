import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { TripRequest } from "./interface";

interface TravelHistoryCardProps {
  tripRequest: TripRequest;
}

const TravelHistoryCard: React.FC<TravelHistoryCardProps> = ({
  tripRequest,
}) => {
  if (!tripRequest || !tripRequest.trip) {
    return null;
  }

  const { trip } = tripRequest;

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{trip?.destination}</p>
        <small className="text-default-500">
          {trip?.startDate} - {trip?.endDate}
        </small>
      </CardHeader>
      <CardBody className="overflow-visible py-2 ">
        <div className="flex items-center justify-between">
          <h3>Trip Status</h3>
          <h4>{tripRequest?.status}</h4>
        </div>
      </CardBody>
    </Card>
  );
};

export default TravelHistoryCard;
