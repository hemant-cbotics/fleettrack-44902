import React, { FC, useEffect } from "react";
import { APP_CONFIG } from "../../constants/constants";
import { asyncLoadScript, removeScript } from "../../utils/common";
import BingMapsReact from "bingmaps-react";

type TBasicMapProps = {
  className?: string;
};

const BasicMap: FC<TBasicMapProps> = ({ className = '' }) => {
  const initRef = React.useRef(false);
  const mapRef = React.useRef(null);

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      console.log('BasicMap useEffect')
      // asyncLoadScript(
      //   APP_CONFIG.MAPS.SCRIPT_URL(`${process.env.REACT_APP_BING_MAPS_API_KEY}`),
      //   APP_CONFIG.MAPS.SCRIPT_ID,
      //   () => {
      //     console.log("Map script loaded");
      //       mapRef.current = new (window as any).Microsoft.Maps.Map(document.getElementById('myMap'), {});
      //   }
      // )
      // return () => {
      //   removeScript(APP_CONFIG.MAPS.SCRIPT_ID)
      // }
    }
  }, [initRef.current]);

  const MemoizedBingMapsReact = React.memo(() => {
    console.log('MemoizedBingMapsReact')
    return <>
      <BingMapsReact
        bingMapsKey={process.env.REACT_APP_BING_MAPS_API_KEY}
        mapOptions={{
          navigationBarMode: 'square', // 'square', 'default'
          supportedMapTypes: ['road', 'aerial', 'grayscale'],
          showLocateMeButton: false,
          showMapTypeSelector: true,
          showZoomButtons: true,
          showTrafficButton: true,
          showScalebar: false,
          showBreadcrumb: true,
          showDashboard: true,
          showFeedback: false,
        }}
        viewOptions={{
          center: { latitude: 42.360081, longitude: -71.058884 },
          mapTypeId: 'road', // 'road', 'aerial', 'canvasDark', 'canvasLight', 'birdseye', 'birdseyeLabels', 'grayscale', 'streetside'
          zoom: 15
        }}
      />
    </>
  });

  return <div className={`relative ${className}`}>
    <MemoizedBingMapsReact />
    {/* <div id="myMap" className="w-full h-full relative"></div> */}
  </div>;
}
export default BasicMap;