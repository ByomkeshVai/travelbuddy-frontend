/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
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
import { toast } from "sonner";
import TravelCardUpdate from "./TravelCardUpdate";

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

  const [isModalOpen1, setIsModalOpen1] = React.useState(false);

  const handleOpenModal1 = () => setIsModalOpen1(true);
  const handleCloseModal1 = () => setIsModalOpen1(false);

  const handleTripDelete = async (tripId: string) => {
    try {
      await deleteTrip(tripId).unwrap();
      toast.success("Trip deleted successfully");
      onOpenChange(false);
    } catch (error: any) {
      toast.success("Failed to delete the trip: ", error);
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

              <Button
                className="flex items-center justify-between"
                onPress={handleOpenModal1}
              >
                Update
              </Button>
              <TravelCardUpdate
                params={params}
                isOpen1={isModalOpen1}
                onOpenChange1={setIsModalOpen1}
                onOpenChange={onOpenChange}
              />
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
