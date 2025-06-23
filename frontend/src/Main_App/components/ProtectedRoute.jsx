import { useEffect } from "react";
import useAuthStore from "../../stores/authStore";
import Loader from "./Loader";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isLoading, user, checkAuth } = useAuthStore();

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!user && !isLoading) {
        await checkAuth();
      }
    };
    checkAuthentication();
  }, [checkAuth, user, isLoading]);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return user ? children : <Navigate to="/auth" replace />;
}

export default ProtectedRoute;
