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
import { useUpdateTravelMutation } from "@/app/redux/api/AuthRedux/TravelBuddyRedux/TravelApi";

interface TravelRequestModalProps {
  tripRequest: any;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const TravelRequestModal: React.FC<TravelRequestModalProps> = ({
  tripRequest,
  isOpen,
  onOpenChange,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(
    tripRequest?.status || ""
  );

  const statusType = [
    { key: "APPROVED", label: "APPROVED" },
    { key: "REJECTED", label: "REJECTED" },
    { key: "PENDING", label: "PENDING" },
  ];

  const [updateTravel] = useUpdateTravelMutation();

  const handleUpdate = async () => {
    try {
      await updateTravel({
        buddyId: tripRequest.id,
        data: {
          tripId: tripRequest.tripId,
          status: selectedStatus,
        },
      }).unwrap();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update travel request:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            Update Trip Status
          </ModalHeader>
          <ModalBody>
            <div className="flex py-2 px-1 justify-between">
              <Select
                items={statusType}
                label="Select Status"
                placeholder="Select Status"
                className="max-w-xs"
                defaultSelectedKeys={[tripRequest?.status]}
                onSelectionChange={(keys) =>
                  setSelectedStatus(Array.from(keys).join(""))
                }
              >
                {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
              </Select>
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
            <Button color="primary" onPress={handleUpdate}>
              Update
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default TravelRequestModal;
