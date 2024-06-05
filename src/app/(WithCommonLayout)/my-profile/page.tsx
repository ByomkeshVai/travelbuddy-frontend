"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import { useSingleUserQuery } from "@/app/redux/api/AuthRedux/AuthApi";
import { getCurrentUser } from "@/app/redux/api/AuthRedux/AuthSlice";
import { useAppSelector } from "@/app/redux/hook";
import Loading from "../components/Loading";
import { Button } from "@nextui-org/react";
import ChangePasswordModal from "./ChangePasswordModal";
import React from "react";

const page = () => {
  const user = useAppSelector(getCurrentUser);

  const { data: getUser, isLoading } = useSingleUserQuery({ userId: user?.id });

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (isLoading) {
    <Loading />;
  }
  return (
    <div className="text-slate-50">
      <div className="flex items-center justify-between">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-slate-50">
            User Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-50">
            Personal details and Information.
          </p>
        </div>
        <div>
          <Button onClick={() => handleOpenModal()}>Change Password</Button>
        </div>

        <ChangePasswordModal
          userId={getUser?.data?.id}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </div>
      <div className="mt-6 border-t border-slate-50">
        <dl className="divide-y divide-slate-50">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-slate-50">
              Username
            </dt>
            <dd className="mt-1 text-sm leading-6 text-slate-50 sm:col-span-2 sm:mt-0">
              {getUser?.data?.username}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-slate-50">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-slate-50 sm:col-span-2 sm:mt-0">
              {getUser?.data?.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-slate-50">
              Role
            </dt>
            <dd className="mt-1 text-sm leading-6 text-slate-50 sm:col-span-2 sm:mt-0">
              {getUser?.data?.role}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-slate-50">
              Status
            </dt>
            <dd className="mt-1 text-sm leading-6 text-slate-50 sm:col-span-2 sm:mt-0">
              {getUser?.data?.status}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default page;
