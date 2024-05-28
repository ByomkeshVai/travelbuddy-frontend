import { Metadata } from "next";
import React from "react";
import TravelPostForm from "./travelPostForm";

export const metadata: Metadata = {
  title: "Travel Post Page",
  description: "Book your next adventure Travel Buddy",
};

export default async function PostTravelForm({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const user = await userInfo();
  return (
    <main>
      <TravelPostForm />
    </main>
  );
}
