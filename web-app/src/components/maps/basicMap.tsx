import React, { FC, useCallback, useEffect } from "react";
import { APP_CONFIG } from "../../constants/constants";
import LoadingAnimation from "../../assets/svg/loadingAnimation.svg";
import { onMapScriptLoaded } from "./onMapScriptLoaded";
import { TGeozoneMapData, TLatLng, TMapState } from "../../types/map";
import { mapGetCurrentPosition } from "../../utils/map";
import { useDispatch, useSelector } from "react-redux";
import { setMapStateData, setUserCurrPosData } from "../../api/store/commonSlice";
import { useLocation } from "react-router-dom";
import { routeUrls } from "../../navigation/routeUrls";

type TBasicMapProps = {
  className?: string;
  mapRef?: any;
  mapData?: TGeozoneMapData;
  setMapData?: React.Dispatch<React.SetStateAction<TGeozoneMapData>>;
  onMapReady?: () => void;
};

type TMapLoadingAnimationProps = {
  bgClassName?: string;
  bgOpacityClassName?: string;
};

export const MapLoadingAnimation: FC<TMapLoadingAnimationProps> = ({
  bgClassName = 'bg-white',
  bgOpacityClassName = 'bg-opacity-90'
}) => (
  <div className={`absolute inset-0 flex items-center justify-center ${bgClassName} ${bgOpacityClassName} z-map-loading-overlay`}>
    <img src={LoadingAnimation} alt="Loading animation" className="w-12 h-12" />
  </div>
);

export const getDefaultMapLayerOptions = (mapState: TMapState) => ({
  traffic: mapState?.mapLayerOptions?.traffic ?? false,
  weather: mapState?.mapLayerOptions?.weather ?? false,
  three_d_building: mapState?.mapLayerOptions?.three_d_building ?? false,
  clustering: mapState?.mapLayerOptions?.clustering ?? true,
  hide_geozones: mapState?.mapLayerOptions?.hide_geozones ?? true,
});

const BasicMap: FC<TBasicMapProps> = React.memo(({
  className = '',
  mapRef,
  mapData,
  setMapData, // deprecated
  onMapReady
}) => {
  const initRef = React.useRef(false);
  const userCurrPos: TLatLng = useSelector((state: any) => state.commonReducer.userCurrPos);
  const mapState: TMapState = useSelector((state: any) => state.commonReducer.mapState);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [loadingMap, setLoadingMap] = React.useState(true);

  const initBingMap =
  () => {
    if(APP_CONFIG.DEBUG.MAPS) console.log('initBingMap');
    const currPosRetrievedCallback = (currPos: TLatLng) => {
      dispatch(setUserCurrPosData(currPos));
      if(mapState?.mapScriptLoaded) {
        onMapScriptLoaded({
          mapRef,
          mapStateToSetToLastViewOnLoad: // set to last view if user is on map overview page - prevent momentary flicker to default location
            pathname === routeUrls.dashboardChildren.mapsChildren.fleet ? mapState : null,
          mapType: mapState?.mapType ?? 'road',
          mapLayerOptions: getDefaultMapLayerOptions(mapState),
          currentPosition: mapData?.centerPosition ?? currPos,
          setLoadingMap,
          onMapReadyCallback: () => {
            dispatch(setMapStateData({
              ...mapState,
              mapType: mapState?.mapType ?? 'road',
              pageMapLoaded: true,
            }));
            onMapReady?.();
          },
        });
      } else {
        // TODO: handle error when user lands directly on a page having map
        if(APP_CONFIG.DEBUG.MAPS) console.log('ERROR: Map script should have been loaded by now');
      }
    }
    // get user's current position, use if available
    if(userCurrPos) {
      // console.log('[basicMap] APP HAS USER CURR POS')
      currPosRetrievedCallback(userCurrPos);
    } else {
      console.log('[basicMap] APP DOES NOT HAVE USER CURR POS YET')
      mapGetCurrentPosition(currPosRetrievedCallback);
    }
  }

  const MemoizedBingMapsReact = useCallback(() => {
    // if(APP_CONFIG.DEBUG.MAPS) console.log('MemoizedBingMapsReact')

    // initialize the map
    if(!initRef.current && mapState?.mapScriptLoaded) {
      initRef.current = true;
      setTimeout(() => initBingMap(), 500);
    }
    
    return <></>
  }, [initBingMap, mapState]);

  return <div className={`relative ${className}`}>
    {loadingMap && (
      <MapLoadingAnimation />
    )}
    <div id={APP_CONFIG.MAPS.COMPONENT_ID} className="w-full h-full relative"></div>
    {/* <>{console.log('[[ RERENDER ]]')}</> */}
    <MemoizedBingMapsReact />
  </div>;
})
export default BasicMap;