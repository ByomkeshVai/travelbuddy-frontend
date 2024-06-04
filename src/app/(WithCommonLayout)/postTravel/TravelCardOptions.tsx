/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Link from "next/link";
import { useDeleteSingleUserAllTripMutation } from "@/app/redux/api/TripRedux/TripApi";

interface TravelOptionModalProps {
  params: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const TravelCardOptions: React.FC<TravelOptionModalProps> = ({
  params,
  isOpen,
  onOpenChange,
}) => {
  const [deleteTrip] = useDeleteSingleUserAllTripMutation();

  const handleTripDelete = async (tripId: string) => {
    try {
      await deleteTrip(tripId).unwrap();
      console.log("Trip deleted successfully");
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to delete the trip: ", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Trip Action</ModalHeader>
          <ModalBody>
            <div className="flex justify-center items-center gap-4">
              <Button color="primary">
                {" "}
                <Link href={`/all-travel/${params}`}>View Trip</Link>{" "}
              </Button>
              <Button color="primary">Update</Button>
              <Button color="primary" onClick={() => handleTripDelete(params)}>
                Delete
              </Button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => onOpenChange(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default TravelCardOptions;
function tripDelete(data: string) {
  throw new Error("Function not implemented.");
}
