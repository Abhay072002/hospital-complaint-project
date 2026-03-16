import { Outlet } from "react-router-dom";
import StaffHeader from "../components/StaffHeader";
import Footer from "../../components/Footer";


const StaffLayout = () => {

  return (
    <div>
      <StaffHeader />
      <Outlet />
      <Footer />
    </div>
  );
};

export default StaffLayout;