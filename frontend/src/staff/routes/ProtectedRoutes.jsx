import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem(`user-${role}`) || "null");

  if (!user || user.role !== role) {
    return <Navigate to={`/${role}/login`} replace />;
  }

  return children;
};

export default ProtectedRoutes;