import { FC } from "react";
import { Outlet } from "react-router-dom";

const DashboardAdminWrapper: FC = () => {
  return (
    <Outlet />
  );
};

export default DashboardAdminWrapper;
