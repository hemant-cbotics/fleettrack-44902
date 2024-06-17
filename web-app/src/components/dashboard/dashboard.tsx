import React, { FC, useCallback } from "react";
import Sidemenu from "../sidemenu";
import DashboardHeader from "./dashboardHeader";
import { Outlet } from "react-router-dom";
import { setMapStateData, setUserCurrPosData, TModalsState } from "../../api/store/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import { TLatLng, TMapState } from "../../types/map";
import { APP_CONFIG } from "../../constants/constants";
import { asyncLoadScript } from "../../utils/common";
import { mapGetCurrentPosition } from "../../utils/map";

interface DashboardWrapperProps extends React.PropsWithChildren {
  children: React.ReactNode;
}

const DashboardWrapper: FC = () => {
  // modals state
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
  
  const initRef = React.useRef(false);
  const mapState: TMapState = useSelector((state: any) => state.commonReducer.mapState);
  const dispatch = useDispatch();

  const MemoizedInitBingMaps =
  // useCallback(
    () => {
    // if(APP_CONFIG.DEBUG.MAPS) console.log('MemoizedInitBingMaps')

    // initialize the map
    if(!initRef.current) {
      initRef.current = true;
      mapGetCurrentPosition((currPos: TLatLng) => {

        // set user current position in store
        dispatch(setUserCurrPosData(currPos));

        // load map script
        asyncLoadScript(
          APP_CONFIG.MAPS.SCRIPT_URL(`${process.env.REACT_APP_BING_MAPS_API_KEY}`),
          APP_CONFIG.MAPS.SCRIPT_ID,
          () => {
            if(APP_CONFIG.DEBUG.MAPS) console.log("Map script loaded");
            setTimeout(() => {

              // load map modules
              const Microsoft = (window as any).Microsoft;
              Microsoft.Maps.loadModule(
                [
                  'Microsoft.Maps.SpatialMath',
                  'Microsoft.Maps.Contour',
                  'Microsoft.Maps.Clustering',
                ],
                () => {

                  // set map script loaded
                  dispatch(setMapStateData({
                    mapScriptLoaded: true,
                  }));

                }
              );

              // TODO: Pre load user current position

            }, /*loadingMap ?*/ 2000/* : 200*/); // delay necessary to let map resources load, before attempting to load the map
          }
        );

      });
    }
    
    return <></>
  }
  // , [mapState]);
  
  return (
    <section className={`container-dashboard bg-white text-base-text ${modalActive ? " h-screen overflow-hidden" : ""}`}>
      <div className="flex min-h-screen grid-cols-12">
        <aside className="h-screen w-64 fixed top-0 left-0">
          <Sidemenu />
        </aside>
        <div className="w-full pl-64">
          <header>
            <MemoizedInitBingMaps />
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
