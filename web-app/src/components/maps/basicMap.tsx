import React, { FC, useCallback, useEffect } from "react";
import { APP_CONFIG } from "../../constants/constants";
import { asyncLoadScript, removeScript } from "../../utils/common";
import LoadingAnimation from "../../assets/svg/loadingAnimation.svg";
import MapMarkerRed from "../../assets/svg/map-marker-red.svg";
import MapMarkerGreen from "../../assets/svg/map-marker-green.svg";
import { onMapScriptLoaded } from "./onMapScriptLoaded";

type TBasicMapProps = {
  className?: string;
};

const BasicMap: FC<TBasicMapProps> = React.memo(({ className = '' }) => {
  const initRef = React.useRef(false);
  const mapRef = React.useRef(null);
  const centreMarkerRef = React.useRef(null);
  const renderCount = React.useRef(0);

  const [loadingMap, setLoadingMap] = React.useState(true);

  const initBingMap = useCallback(() => {
    console.log('initBingMap')
    navigator.geolocation.getCurrentPosition(function(_) {
      console.log('GET CurrentPosition', `${_.coords.latitude}, ${_.coords.longitude}`)
      asyncLoadScript(
        APP_CONFIG.MAPS.SCRIPT_URL(`${process.env.REACT_APP_BING_MAPS_API_KEY}`),
        APP_CONFIG.MAPS.SCRIPT_ID,
        () => {
          console.log("Map script loaded");
          setTimeout(() => {
            
            onMapScriptLoaded({
              currentPosition: _,
              setLoadingMap,
            })

          }, loadingMap ? 2000 : 200); // delay necessary to let map resources load, before attempting to load the map
        }
      )
    });
  }, [loadingMap]);

  const removeBingMap = useCallback(() => {
    console.log('removeBingMap')
    removeScript(APP_CONFIG.MAPS.SCRIPT_ID)
  }, []);

  useEffect(() => {
    console.log(renderCount.current)
  }, [renderCount.current]);

  useEffect(() => {
    console.log('COMP initBingMap');
  }, [initBingMap]);

  const MemoizedBingMapsReact = useCallback(() => {
    console.log('MemoizedBingMapsReact')

    // initialize the map
    if(!initRef.current) {
      initRef.current = true;
      setTimeout(() => initBingMap(), 1000);
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