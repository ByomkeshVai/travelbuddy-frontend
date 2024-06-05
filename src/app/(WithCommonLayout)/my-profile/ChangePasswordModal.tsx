/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdatePasswordMutation } from "@/app/redux/api/AuthRedux/AuthApi";
import Loading from "@/app/(WithCommonLayout)/components/Loading";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface ChangePasswordModalProps {
  userId: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

interface ErrorResponse {
  success: boolean;
  message: string;
  errorDetails?: { message: string }[];
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  userId,
  isOpen,
  onOpenChange,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [updatePassword, { isLoading: isUpdating, error }] =
    useUpdatePasswordMutation();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isFetchBaseQueryError = (
    error: any
  ): error is { data: ErrorResponse } => {
    return (
      error && error.data && (error.data as ErrorResponse).message !== undefined
    );
  };

  const onSubmit = async (data: any) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.warning("Passwords do not match");
      return;
    }
    try {
      await updatePassword({
        userId: userId,
        payload: {
          password: data.password,
          newPassword: data.newPassword,
        },
      }).unwrap();
      onOpenChange(false);
      toast.success("Password updated successfully!");
      reset();
    } catch (err) {
      console.error("Failed to update the password: ", err);
      const errorMessage =
        isFetchBaseQueryError(err) && err.data.message
          ? err.data.message
          : "Failed to update the password.";
      toast.error(errorMessage);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            Change Password
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <label>
                  Old Password
                  <div className="relative">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      {...register("password")}
                      className="w-full p-2 mt-1 rounded-md"
                    />
                    <span
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                      {showOldPassword ? (
                        <FaRegEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaRegEye className="h-5 w-5" />
                      )}
                    </span>
                  </div>
                </label>
                <label>
                  New Password
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      {...register("newPassword")}
                      className="w-full p-2 mt-1 rounded-md"
                    />
                    <span
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <FaRegEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaRegEye className="h-5 w-5" />
                      )}
                    </span>
                  </div>
                </label>
                <label>
                  Confirm New Password
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmNewPassword")}
                      className="w-full p-2 mt-1 rounded-md"
                    />
                    <span
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <FaRegEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaRegEye className="h-5 w-5" />
                      )}
                    </span>
                  </div>
                </label>
                <Button type="submit" color="primary" isLoading={isUpdating}>
                  Update
                </Button>
              </div>
            </form>
            {error && (
              <div className="text-red-500 mt-2">
                {isFetchBaseQueryError(error) && error.data.message
                  ? error.data.message
                  : "An unexpected error occurred"}
              </div>
            )}
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

export default ChangePasswordModal;
