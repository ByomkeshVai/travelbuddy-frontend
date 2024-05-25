import type { Metadata } from "next";
import { userInfo } from "./actions/auth";

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
      <NavBar user={user} />
      <div className="mx-auto container">{children}</div>
      <Footer />
    </div>
  );
}
