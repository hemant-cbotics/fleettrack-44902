import React, { FC, useCallback, useEffect } from "react";
import { APP_CONFIG } from "../../constants/constants";
import { asyncLoadScript, removeScript } from "../../utils/common";
import LoadingAnimation from "../../assets/svg/loadingAnimation.svg";
import { onMapScriptLoaded } from "./onMapScriptLoaded";
import { TGeozoneMapData, TLatLng } from "./types";
import { mapGetCurrentPosition } from "../../utils/map";
import { useDispatch, useSelector } from "react-redux";
import { setUserCurrPosData } from "../../api/store/commonSlice";

type TBasicMapProps = {
  className?: string;
  mapRef?: any;
  setMapData?: React.Dispatch<React.SetStateAction<TGeozoneMapData>>;
  onMapReady?: () => void;
};

const BasicMap: FC<TBasicMapProps> = React.memo(({
  className = '',
  mapRef,
  setMapData,
  onMapReady
}) => {
  const initRef = React.useRef(false);
  const renderCount = React.useRef(0);
  const userCurrPos: TLatLng = useSelector((state: any) => state.commonReducer.userCurrPos);
  const dispatch = useDispatch();

  const [loadingMap, setLoadingMap] = React.useState(true);

  const initBingMap = useCallback(() => {
    if(APP_CONFIG.DEBUG.MAPS) console.log('initBingMap');
    const currPosRetrievedCallback = (currPos: TLatLng) => {
      dispatch(setUserCurrPosData(currPos));
      console.log('[setMapData] via initBingMap', currPos);
      setMapData?.(data => ({
        ...data,
        centerPosition: currPos,
      }));
      asyncLoadScript(
        APP_CONFIG.MAPS.SCRIPT_URL(`${process.env.REACT_APP_BING_MAPS_API_KEY}`),
        APP_CONFIG.MAPS.SCRIPT_ID,
        () => {
          if(APP_CONFIG.DEBUG.MAPS) console.log("Map script loaded");
          setTimeout(() => {
            
            onMapScriptLoaded({
              mapRef,
              currentPosition: currPos,
              setLoadingMap,
              onMapReadyCallback: onMapReady,
            })

          }, loadingMap ? 2000 : 200); // delay necessary to let map resources load, before attempting to load the map
        }
      )
    }
    // get user's current position, use if available
    if(userCurrPos) {
      currPosRetrievedCallback(userCurrPos);
    } else {
      mapGetCurrentPosition(currPosRetrievedCallback);
    }
  }, [loadingMap]);

  const removeBingMap = useCallback(() => {
    if(APP_CONFIG.DEBUG.MAPS) console.log('removeBingMap')
    removeScript(APP_CONFIG.MAPS.SCRIPT_ID)
  }, []);

  const MemoizedBingMapsReact = useCallback(() => {
    if(APP_CONFIG.DEBUG.MAPS) console.log('MemoizedBingMapsReact')

    // initialize the map
    if(!initRef.current) {
      initRef.current = true;
      setTimeout(() => initBingMap(), 500);
    }
    
    return <>
    </>
  }, [initBingMap]);

  return <div className={`relative ${className}`}>
    {loadingMap && (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        <img src={LoadingAnimation} alt="Loading animation" className="w-12 h-12" />
      </div>
    )}
    <div id={APP_CONFIG.MAPS.COMPONENT_ID} className="w-full h-full relative"></div>
    <>{console.log('[[ RERENDER ]]')}</>
    <MemoizedBingMapsReact />
  </div>;
})
export default BasicMap;