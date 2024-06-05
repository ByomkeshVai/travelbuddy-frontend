/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useUpdateStatusMutation } from "@/app/redux/api/AuthRedux/AuthApi";
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
  userId: string;
  isOpen1: boolean;
  onOpenChange1: (isOpen: boolean) => void;
}

const statusType = [
  { key: "active", label: "Active" },
  { key: "block", label: "Blocked" },
];

const StatusChangeModal: React.FC<TravelRequestModalProps> = ({
  userId,
  isOpen1,
  onOpenChange1,
}) => {
  const [updateStatus, { isLoading, error }] = useUpdateStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handleUpdate = async () => {
    if (!selectedStatus) {
      console.error("No status selected");
      return;
    }

    try {
      await updateStatus({
        userId,
        status: selectedStatus,
      }).unwrap();
      onOpenChange1(false);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <Modal isOpen={isOpen1} onOpenChange={onOpenChange1} placement="top-center">
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
                onSelectionChange={(keys) =>
                  setSelectedStatus(Array.from(keys).join(""))
                }
              >
                {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
              </Select>
            </div>
            {error && (
              <div className="text-red-500">Failed to update status</div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => onOpenChange1(false)}
            >
              Close
            </Button>
            <Button
              color="primary"
              onPress={handleUpdate}
              isLoading={isLoading}
            >
              Update
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default StatusChangeModal;
