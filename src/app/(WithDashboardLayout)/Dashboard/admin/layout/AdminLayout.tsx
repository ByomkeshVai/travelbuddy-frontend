"use client";

import { NavbarWrapper } from "@/app/(WithDashboardLayout)/DashboardNavbar/DashboardNavbar";
import { AdminSidebarWrapper } from "@/app/(WithDashboardLayout)/Sidebar/AdminSidebar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <section className="flex">
      <AdminSidebarWrapper />
      <NavbarWrapper>{children}</NavbarWrapper>
    </section>
  );
};
