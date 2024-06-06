import { Metadata } from "next";
import React from "react";
import TravelPostForm from "./travelPostForm";
import { useAppSelector } from "@/app/redux/hook";
import { getCurrentUser } from "@/app/redux/api/AuthRedux/AuthSlice";
import { redirect } from "next/navigation";
import { store } from "@/app/redux/store";

export const metadata: Metadata = {
  title: "Travel Post Page",
  description: "Book your next adventure Travel Buddy",
};

export default async function PostTravelForm({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <TravelPostForm />
    </main>
  );
}
