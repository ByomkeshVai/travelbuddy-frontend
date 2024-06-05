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
import Swal from "sweetalert2";

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
