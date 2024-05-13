import { FC } from "react";
import Sidemenu from "../sidemenu";
import DashboardHeader from "./dashboardHeader";
import { Outlet } from "react-router-dom";

interface DashboardWrapperProps extends React.PropsWithChildren {
  children: React.ReactNode;
}

const DashboardWrapper: FC = () => {
  return (
    <section className="container-dashboard bg-white">
      <div className="flex min-h-screen grid-cols-12">
        <aside className="h-screen w-64 fixed top-0 left-0">
          <Sidemenu />
        </aside>
        <div className="w-full pl-64">
          <header>
            <DashboardHeader />
          </header>
          <main>
            <Outlet />  
          </main>
        </div>
      </div>
    </section>
  );
};

export default DashboardWrapper;
