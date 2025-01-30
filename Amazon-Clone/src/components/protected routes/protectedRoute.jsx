import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("user"); // Check if user is logged in

  if (!isAuthenticated) {
    // alert("Sign in first"); 
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
