import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Path } from "../routes/route-config";
import React from "react";

const RequireAuth = ({ allowedRoles, ...props }) => {
  const location = useLocation();

  // let role = props?.user?.data?.roleList[0]

  const Checker = () => {
    if (props?.featureList?.find((role) => allowedRoles?.includes(role))) {
      return <Outlet />;
    } else {
      if (props?.user) {
        return (
          <Navigate
            to={Path.dashboard}
            state={{ initialLocation: "/" }}
            replace
          />
        );
      } else {
        return (
          <Navigate
            to={Path.login}
            state={{ initialLocation: location }}
            replace
          />
        );
      }
    }
  };

  return Checker();
};

export default RequireAuth;
