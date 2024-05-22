import { FC } from "react";
import Sidemenu from "../sidemenu";
import DashboardHeader from "./dashboardHeader";
import { Outlet } from "react-router-dom";
import { TModalsState } from "../../api/store/commonSlice";
import { useSelector } from "react-redux";

interface DashboardWrapperProps extends React.PropsWithChildren {
  children: React.ReactNode;
}

const DashboardWrapper: FC = () => {
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const modalActive =
    modalsState.showEditColumns === true ||
    // modalsState.showAdminsDropdown === true ||
    modalsState.showCreateUser === true ||
    modalsState.showCreateVehicle === true ||
    modalsState.showCreateDriver === true ||
    modalsState.showCreateGroup === true ||
    modalsState.showCreateFleetTag === true ||
    modalsState.showCreateGeozone === true;
  return (
    <section className={`container-dashboard bg-white${modalActive ? " h-screen overflow-hidden" : ""}`}>
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
