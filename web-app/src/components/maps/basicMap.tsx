import React, { FC, useCallback, useEffect } from "react";
import { APP_CONFIG } from "../../constants/constants";
import { asyncLoadScript, removeScript } from "../../utils/common";
import LoadingAnimation from "../../assets/svg/loadingAnimation.svg";
import { onMapScriptLoaded } from "./onMapScriptLoaded";
import { TLatLng } from "./types";
import { mapGetCurrentPosition } from "../../utils/map";

type TBasicMapProps = {
  className?: string;
  mapRef?: any;
  currentPosition: React.MutableRefObject<TLatLng>;
  onMapReady?: () => void;
};

const BasicMap: FC<TBasicMapProps> = React.memo(({
  className = '',
  mapRef,
  currentPosition,
  onMapReady
}) => {
  const initRef = React.useRef(false);
  const renderCount = React.useRef(0);

  const [loadingMap, setLoadingMap] = React.useState(true);

  const initBingMap = useCallback(() => {
    if(APP_CONFIG.DEBUG.MAPS) console.log('initBingMap')
    mapGetCurrentPosition((currPos) => {
      currentPosition.current = currPos;
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
    });
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
    <MemoizedBingMapsReact />
  </div>;
})
export default BasicMap;