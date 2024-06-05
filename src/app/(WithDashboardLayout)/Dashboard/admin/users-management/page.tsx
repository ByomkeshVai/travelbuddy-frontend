"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { useAllUserQuery } from "@/app/redux/api/AuthRedux/AuthApi";
import Loading from "@/app/(WithCommonLayout)/components/Loading";
import { DeleteIcon } from "@/app/(WithCommonLayout)/components/DeleteIcon";
import StatusChangeModal from "./StatusChangeModal";
import RoleChangeModal from "./RoleChangeModal";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const Page = () => {
  const { data: allUser, isLoading, error } = useAllUserQuery(undefined);

  const [isRoleModalOpen, setIsRoleModalOpen] = React.useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = React.useState(false);

  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(
    null
  );

  const handleOpenRoleModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsRoleModalOpen(true);
  };

  const handleCloseRoleModal = () => {
    setSelectedUserId(null);
    setIsRoleModalOpen(false);
  };

  const handleOpenStatusModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsStatusModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setSelectedUserId(null);
    setIsStatusModalOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) return <div>Error loading user data</div>;

  return (
    <>
      <Table aria-label="User profile table">
        <TableHeader>
          <TableColumn>Username</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {allUser?.data?.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Tooltip color="success" content="Change role">
                  <span
                    className="text-lg text-success cursor-pointer active:opacity-50"
                    onClick={() => handleOpenRoleModal(user.id)}
                  >
                    {user.role}
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip color="primary" content="Change status">
                  <span
                    className="text-lg text-primary cursor-pointer active:opacity-50"
                    onClick={() => handleOpenStatusModal(user.id)}
                  >
                    {user.status}
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip color="danger" content="Delete user">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedUserId && (
        <RoleChangeModal
          userId={selectedUserId}
          isOpen={isRoleModalOpen}
          onOpenChange={setIsRoleModalOpen}
        />
      )}
      {selectedUserId && (
        <StatusChangeModal
          userId={selectedUserId}
          isOpen1={isStatusModalOpen}
          onOpenChange1={setIsStatusModalOpen}
        />
      )}
    </>
  );
};

export default Page;
