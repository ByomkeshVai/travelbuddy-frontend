import type { Metadata } from "next";
import { userInfo } from "./actions/auth";
import Footer from "../components/pages/shared/Footer";
import NavArea from "../components/pages/shared/Navbar";

export const metadata: Metadata = {
  title: "Travel Buddy",
  description: "Book your next adventure Partner with Travel Buddy.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await userInfo();
  return (
    <div>
      <NavArea />
      <div>{children}</div>
    </div>
  );
}
