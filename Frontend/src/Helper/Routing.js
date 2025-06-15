import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom/dist";

export const ProtectedRoute = ({ children }) => {
  // const isLogin = useSelector((state) => state?.authReducer?.isLogin);
  // if (!isLogin) {
  //   return [<Navigate to="/login" replace />];
  // } else {
  //   return children;
  // }
  return children
};

export const BeforeLoginRoute = ({ children }) => {
  // const isLogin = useSelector((state) => state?.authReducer?.isLogin);
  // if (isLogin) {
  //   return <Navigate to="/" replace />;
  // } else {
  //   return children;
  // }
  return children
};
