/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import {
  useGeSingleTripQuery,
  useUpdateTripMutation,
} from "@/app/redux/api/TripRedux/TripApi";
import Loading from "../components/Loading";
import { toast } from "sonner";

interface TravelOptionModalProps {
  params: string;
  isOpen1: boolean;
  onOpenChange1: (isOpen: boolean) => void;
  onOpenChange: any;
}

const TravelCardUpdate: React.FC<TravelOptionModalProps> = ({
  params,
  isOpen1,
  onOpenChange1,
  onOpenChange,
}) => {
  const {
    data: userTrips,
    isLoading,
    isFetching,
    error,
  } = useGeSingleTripQuery(params);

  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    if (userTrips) {
      reset(userTrips.data);
    }
  }, [userTrips, reset]);

  const [updateTrip, { isLoading: isUpdating }] = useUpdateTripMutation();

  const onSubmit = async (data: any) => {
    try {
      await updateTrip({ tripId: params, payload: data });
      onOpenChange1(false);
      toast.success("Trip updated successfully!");
    } catch (error) {
      console.error("Failed to update the trip: ", error);
      toast.error("Failed to update the trip.");
    }
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <Modal isOpen={isOpen1} onOpenChange={onOpenChange1} placement="top-center">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Trip Action</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <label>
                  Destination
                  <input
                    type="text"
                    {...register("destination")}
                    defaultValue={userTrips.data.destination}
                  />
                </label>
                <label>
                  Start Date
                  <input
                    type="date"
                    {...register("startDate")}
                    defaultValue={userTrips.data.startDate}
                  />
                </label>
                <label>
                  End Date
                  <input
                    type="date"
                    {...register("endDate")}
                    defaultValue={userTrips.data.endDate}
                  />
                </label>
                <label>
                  Type
                  <input
                    type="text"
                    {...register("type")}
                    defaultValue={userTrips.data.type}
                  />
                </label>
                <label>
                  Description
                  <textarea
                    {...register("description")}
                    defaultValue={userTrips.data.description}
                  />
                </label>
                <Button type="submit" color="primary" isLoading={isUpdating}>
                  Update
                </Button>
              </div>
            </form>
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

export default TravelCardUpdate;
