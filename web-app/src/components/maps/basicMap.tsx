import React, { FC, useCallback, useEffect } from "react";
import { APP_CONFIG } from "../../constants/constants";
import LoadingAnimation from "../../assets/svg/loadingAnimation.svg";
import { onMapScriptLoaded } from "./onMapScriptLoaded";
import { TGeozoneMapData, TLatLng, TMapState } from "../../types/map";
import { mapGetCurrentPosition } from "../../utils/map";
import { useDispatch, useSelector } from "react-redux";
import { setMapStateData, setUserCurrPosData } from "../../api/store/commonSlice";

type TBasicMapProps = {
  className?: string;
  mapRef?: any;
  mapData?: TGeozoneMapData;
  setMapData?: React.Dispatch<React.SetStateAction<TGeozoneMapData>>;
  onMapReady?: () => void;
};

const BasicMap: FC<TBasicMapProps> = React.memo(({
  className = '',
  mapRef,
  mapData,
  setMapData,
  onMapReady
}) => {
  const initRef = React.useRef(false);
  const userCurrPos: TLatLng = useSelector((state: any) => state.commonReducer.userCurrPos);
  const mapState: TMapState = useSelector((state: any) => state.commonReducer.mapState);
  const dispatch = useDispatch();

  const [loadingMap, setLoadingMap] = React.useState(true);

  const initBingMap = useCallback(() => {
    if(APP_CONFIG.DEBUG.MAPS) console.log('initBingMap');
    const currPosRetrievedCallback = (currPos: TLatLng) => {
      dispatch(setUserCurrPosData(currPos));
      console.log('[setMapData] via initBingMap [DISABLED]', currPos);
      // setMapData?.({
      //   ...mapData,
      //   centerPosition: mapData?.centerPosition ?? currPos,
      // });
      if(mapState?.mapScriptLoaded) {
        onMapScriptLoaded({
          mapRef,
          currentPosition: mapData?.centerPosition ?? currPos,
          setLoadingMap,
          onMapReadyCallback: () => {
            dispatch(setMapStateData({
              ...mapState,
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
      currPosRetrievedCallback(userCurrPos);
    } else {
      mapGetCurrentPosition(currPosRetrievedCallback);
    }
  }, [loadingMap, mapState]);

  const MemoizedBingMapsReact = useCallback(() => {
    if(APP_CONFIG.DEBUG.MAPS) console.log('MemoizedBingMapsReact')

    // initialize the map
    if(!initRef.current && mapState?.mapScriptLoaded) {
      initRef.current = true;
      setTimeout(() => initBingMap(), 500);
    }
    
    return <></>
  }, [initBingMap, mapState]);

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