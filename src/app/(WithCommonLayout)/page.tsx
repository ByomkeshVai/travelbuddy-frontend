import type { Metadata } from "next";
import { userInfo } from "./actions/auth";
import Footer from "../components/pages/shared/Footer";
import NavArea from "../components/pages/shared/Navbar";
import Hero from "./sections/Hero";

export const metadata: Metadata = {
  title: "Apollo Gears",
  description: "Book your next adventure with Apollo Gears.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const user = await userInfo();
  return (
    <div>
      <Hero></Hero>
    </div>
  );
}
