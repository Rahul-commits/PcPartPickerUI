import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // console.log("firne2");
  // console.log(allowedRoles);
  // console.log("firne3");
  //const myrole = auth?.roles?.auth.roles[0];
  console.log("hello");
  console.log(auth);
  console.log(auth.user);
  console.log(auth.roles);
  console.log(allowedRoles);

  //console.log(myrole);
  console.log("final");
  console.log(auth.accessToken);
  console.log("Seri");
  console.log(auth.roles);
  console.log(allowedRoles);
  console.log(allowedRoles.includes(auth.roles));
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    //return auth?.role === allowedRoles ? (
    <Outlet />
  ) : //<Navigate to="/" state={{ from: location }} replace />
  //myrole = auth?.roles ? auth.roles : "";
  // auth?.roles ? (
  //   auth.roles
  // ) : "" === "ROLE_USER" ? (
  //   <Navigate to="/user" state={{ from: location }} replace />
  // ) : (
  //   <Navigate to="/" state={{ from: location }} replace />
  // )
  auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
