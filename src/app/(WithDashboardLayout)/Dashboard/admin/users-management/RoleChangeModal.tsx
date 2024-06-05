/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useUpdateRoleMutation } from "@/app/redux/api/AuthRedux/AuthApi";
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
import React, { useState } from "react";

interface TravelRequestModalProps {
  userId: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const roleType = [
  { key: "admin", label: "Admin" },
  { key: "user", label: "User" },
];

const RoleChangeModal: React.FC<TravelRequestModalProps> = ({
  userId,
  isOpen,
  onOpenChange,
}) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [updateRole, { isLoading, error }] = useUpdateRoleMutation();

  const handleUpdate = async () => {
    if (!selectedRole) {
      console.error("No role selected");
      return;
    }

    try {
      await updateRole({
        userId,
        role: selectedRole,
      }).unwrap();
      onOpenChange(false);
    } catch (err) {
      console.error("Failed to update role:", err);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            Update User Role
          </ModalHeader>
          <ModalBody>
            <div className="flex py-2 px-1 justify-between">
              <Select
                items={roleType}
                label="Select Role"
                placeholder="Select Role"
                className="max-w-xs"
                selectedKeys={selectedRole ? [selectedRole] : []}
                onSelectionChange={(keys) =>
                  setSelectedRole(Array.from(keys)[0] as string)
                }
              >
                {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
              </Select>
            </div>
            {error && <div className="text-red-500">Failed to update role</div>}
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => onOpenChange(false)}
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

export default RoleChangeModal;
