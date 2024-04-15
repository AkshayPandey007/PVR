import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ user }: any) => {
  const arrayString = localStorage.getItem('pvrMovies');
  let userExist:any = {};
  userExist = arrayString && arrayString !== "undefined"? arrayString:"";
 
  return userExist ? <Outlet />:<Navigate to="/login" />;

};

export default PrivateRoute;
