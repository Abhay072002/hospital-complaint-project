import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ComplaintForm from "./pages/ComplaintForm";
import UserLayout from "./layouts/userLayout";
import StaffLayout from "./staff/layout/staffLayout";
import StaffDashboard from "./staff/pages/StaffDashboard";
import MyTasks from "./staff/pages/MyTasks";
import StaffLogin from "./staff/pages/StaffLogin";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminLayout from "./admin/layout/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import StaffManagement from "./admin/pages/StaffManagement";
import TaskManagement from "./admin/pages/TaskManagement";
import ComplaintManagement from "./admin/pages/ComplaintManagement";
import ProtectedRoutes from "./staff/routes/ProtectedRoutes";
import AllComplaints from "./admin/pages/AllComplaints";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrackComplaint from "./pages/TrackComplaint";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="/submit" element={<ComplaintForm />} />
            <Route path="/track" element={<TrackComplaint />} />
          </Route>

          <Route
            path="/staff"
            element={
              <ProtectedRoutes role="staff">
                <StaffLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<StaffDashboard />} />
            <Route path="tasks" element={<MyTasks />} />
          </Route>

          <Route path="/staff/login" element={<StaffLogin />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoutes role="admin">
                <AdminLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="staff" element={<StaffManagement />} />
            <Route path="tasks" element={<TaskManagement />} />
            <Route path="complaints" element={<ComplaintManagement />} />
            <Route path="complaints/all" element={<AllComplaints />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
