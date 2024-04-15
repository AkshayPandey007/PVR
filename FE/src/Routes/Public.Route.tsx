import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = ({ user }: any) => {
  const arrayString = localStorage.getItem('pvrMovies');
  let userExist:any = {};
  userExist = arrayString && arrayString !== "undefined"? arrayString:"";
  
  return userExist ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;