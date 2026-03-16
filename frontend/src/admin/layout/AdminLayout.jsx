import React from "react";
import AdminHeader from "../components/AdminHeader";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AdminLayout;
