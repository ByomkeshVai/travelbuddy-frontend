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
    { key: "DECLINED", label: "DECLINED" },
    { key: "PENDING", label: "PENDING" },
  ];

  const handleUpdate = () => {
    console.log({
      requestId: tripRequest.id,
      tripId: tripRequest.tripId,
      status: selectedStatus,
    });
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
