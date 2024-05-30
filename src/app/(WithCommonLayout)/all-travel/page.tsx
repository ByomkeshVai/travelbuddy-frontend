import { Metadata } from "next";
import React from "react";

import AllTravelPage from "./AllTravelPage";

export const metadata: Metadata = {
  title: "All Travel Page",
  description: "Book your next adventure Travel Buddy",
};

export default async function AllTravel({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const user = await userInfo();
  return (
    <main>
      <AllTravelPage />
    </main>
  );
}
