import type { Metadata } from "next";
import DashboardLayout from "./Layout/DashboardLayout";
import { store } from "../redux/store";
import { getCurrentUser } from "../redux/api/AuthRedux/AuthSlice";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Book your next adventure with Travel Buddy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const state = store.getState();
  const user = getCurrentUser(state);

  if (!user) {
    redirect("/login");
  }
  return (
    <div>
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
}
