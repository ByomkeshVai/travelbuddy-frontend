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
  console.log(params);
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
              <Button color="primary">Delete</Button>
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
