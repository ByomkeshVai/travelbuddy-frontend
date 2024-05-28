import { Metadata } from "next";
import React from "react";
import MyravelPage from "./MyravelPage";

export const metadata: Metadata = {
  title: "Travel Page",
  description: "Book your next adventure Travel Buddy",
};

export default async function PostTravelPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const user = await userInfo();
  return (
    <main>
      <MyravelPage />
    </main>
  );
}
