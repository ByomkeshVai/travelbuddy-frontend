import React from "react";
import { Layout } from "./layout/AdminLayout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" ">
      <Layout>
        <div>{children}</div>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
