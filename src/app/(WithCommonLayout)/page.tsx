import type { Metadata } from "next";
import { userInfo } from "./actions/auth";
import Footer from "../components/pages/shared/Footer";
import NavArea from "../components/pages/shared/Navbar";
import Hero from "./sections/Hero";
import TravelCard from "./sections/TravelCard";

export const metadata: Metadata = {
  title: "Travel Buddy",
  description: "Book your next adventure Travel Buddy",
};

export default async function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const user = await userInfo();
  return (
    <main>
      <Hero />
      <TravelCard />
    </main>
  );
}
