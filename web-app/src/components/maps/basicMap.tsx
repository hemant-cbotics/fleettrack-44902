import React, { FC, useEffect } from "react";
import { APP_CONFIG } from "../../constants/constants";
import { asyncLoadScript, removeScript } from "../../utils/common";
import BingMapsReact from "bingmaps-react";
import LoadingAnimation from "../../assets/svg/loadingAnimation.svg";
import MapMarkerRed from "../../assets/svg/map-marker-red.svg";
import MapMarkerGreen from "../../assets/svg/map-marker-green.svg";

type TBasicMapProps = {
  className?: string;
};

const BasicMap: FC<TBasicMapProps> = ({ className = '' }) => {
  const initRef = React.useRef(false);
  const mapRef = React.useRef(null);
  const centreMarkerRef = React.useRef(null);

  const [loadingMap, setLoadingMap] = React.useState(true);

  const initBingMap = () => {
    console.log('initBingMap')
    navigator.geolocation.getCurrentPosition(function(_) {
      console.log('navigator.geolocation.getCurrentPosition', _)
      asyncLoadScript(
        APP_CONFIG.MAPS.SCRIPT_URL(`${process.env.REACT_APP_BING_MAPS_API_KEY}`),
        APP_CONFIG.MAPS.SCRIPT_ID,
        () => {
          console.log("Map script loaded");
          setTimeout(() => {
            // render the map
            mapRef.current = new (window as any).Microsoft.Maps.Map(
              document.getElementById('myMap'),
              {
                mapTypeId: (window as any).Microsoft.Maps.MapTypeId.road, // aerial, auto, birdseye, collinsBart, mercator, ordnanceSurvey, road, streetside
                navigationBarMode: (window as any).Microsoft.Maps.NavigationBarMode.square, // 'square', 'default'
                center: new (window as any).Microsoft.Maps.Location(_.coords.latitude, _.coords.longitude),
                zoom: 18,
              }
            );
            setLoadingMap(false);

            // load the clustering module
            // (window as any).Microsoft.Maps.loadModule("Microsoft.Maps.Clustering", function () {
            //   //Create a ClusterLayer and add it to the map.
            //   var clusterLayer = new (window as any).Microsoft.Maps.ClusterLayer(pins);
            //   (mapRef.current as any).layers.insert(clusterLayer);
            // });

            // create custom Pushpin using a url to an SVG.
            var center = (mapRef.current as any)?.getCenter();
            centreMarkerRef.current = new (window as any).Microsoft.Maps.Pushpin(
              center,
              {
                icon: MapMarkerRed,
                anchor: new (window as any).Microsoft.Maps.Point(16, 32)
              }
            );
            // add the pushpin to the map
            (mapRef.current as any)?.entities.push(centreMarkerRef.current);

            // create custom Pushpin using a url to an SVG.
            var m = new (window as any).Microsoft.Maps.Pushpin(
              new (window as any).Microsoft.Maps.Location(_.coords.latitude, _.coords.longitude + 0.001),
              {
                icon: MapMarkerGreen,
                anchor: new (window as any).Microsoft.Maps.Point(16, 32),
                draggable: true
              }
            );
            // add the pushpin to the map
            (mapRef.current as any)?.entities.push(m);

          }, loadingMap ? 5000 : 500); // delay necessary to let map resources load, before attempting to load the map
        }
      )
    });
  }
  const removeBingMap = () => {
    console.log('removeBingMap')
    removeScript(APP_CONFIG.MAPS.SCRIPT_ID)
  }

  // useEffect(() => {
  //   if (!initRef.current) {
  //     initRef.current = true;
  //     console.log('BasicMap useEffect')
  //     // initBingMap();
  //     // return () => {
  //     //   removeBingMap();
  //     // }
  //   }
  // }, [initRef.current]);

  const MemoizedBingMapsReact = React.memo(() => {
    console.log('MemoizedBingMapsReact')

    // initialize the map
    setTimeout(() => initBingMap(), 1000);
    
    return <>
      <div id="myMap" className="w-full h-full relative"></div>
      {/* <BingMapsReact
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
      /> */}
    </>
  });

  return <div className={`relative ${className}`}>
    {loadingMap && (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        <img src={LoadingAnimation} alt="Loading animation" className="w-12 h-12" />
      </div>
    )}
    <MemoizedBingMapsReact />
  </div>;
}
export default BasicMap;