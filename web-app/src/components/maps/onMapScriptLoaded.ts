import React from "react";
import MapMarkerRed from "../../assets/svg/map-marker-red.svg";
import MapMarkerGreen from "../../assets/svg/map-marker-green.svg";
import { APP_CONFIG } from "../../constants/constants";

type TOnMapScriptLoadedProps = {
  currentPosition: GeolocationPosition;
  setLoadingMap: React.Dispatch<React.SetStateAction<boolean>>;
}

export const onMapScriptLoaded = (props: TOnMapScriptLoadedProps) => {

  const Microsoft = (window as any).Microsoft;
  let map = (window as any).basicMap;
  
  // render the map
  map = new Microsoft.Maps.Map(
    document.getElementById(APP_CONFIG.MAPS.COMPONENT_ID),
    {
      mapTypeId: Microsoft.Maps.MapTypeId.road, // aerial, auto, birdseye, collinsBart, mercator, ordnanceSurvey, road, streetside
      navigationBarMode: Microsoft.Maps.NavigationBarMode.square, // 'square', 'default'
      center: new Microsoft.Maps.Location(props.currentPosition.coords.latitude, props.currentPosition.coords.longitude),
      zoom: 13,
    }
  );
  props.setLoadingMap(false);

  function createCircle(center: any, radius: any, color: any) {
    //Calculate the locations for a regular polygon that has 36 locations which will result in an approximate circle.
    const locs = Microsoft.Maps.SpatialMath.getRegularPolygon(center, radius, 36 * 2, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
    return new Microsoft.Maps.ContourLine(locs, color);
  }

  //Load the Spatial Math module.
  Microsoft.Maps.loadModule(['Microsoft.Maps.SpatialMath', 'Microsoft.Maps.Contour'], function () {
    var center = map.getCenter();

    var circles = [
      createCircle(center, 1, 'rgba(0,0,150,0.2)'),
      createCircle(center, 2, 'rgba(0,0,250,0.2)'),
      createCircle(center, 3, 'rgba(0,50,200,0.2)'),
      createCircle(center, 4, 'rgba(0,100,200,0.2)'),
      createCircle(center, 5, 'rgba(0,150,200,0.2)'),
    ]

    var layer = new Microsoft.Maps.ContourLayer(circles, {
        colorCallback: (val: any) => val,
        polygonOptions: {
          strokeThickness: 1,
          strokeColor: 'rgba(0,0,0,0.9)',
          // fillColor: 'rgba(0,0,0,0.1)',
          visible: true
        }
    });
    map.layers.insert(layer);
});

  // load the clustering module
  // Microsoft.Maps.loadModule("Microsoft.Maps.Clustering", function () {
  //   //Create a ClusterLayer and add it to the map.
  //   var clusterLayer = new Microsoft.Maps.ClusterLayer(pins);
  //   (thisMap as any).layers.insert(clusterLayer);
  // });

  // create custom Pushpin using a url to an SVG.
  var center = map?.getCenter();
  (window as any).mapCentreMarker = new Microsoft.Maps.Pushpin(
    center,
    {
      icon: MapMarkerRed,
      anchor: new Microsoft.Maps.Point(16, 32)
    }
  );
  // add the pushpin to the map
  map.entities.push((window as any).mapCentreMarker);

  // create custom Pushpin using a url to an SVG.
  var m = new Microsoft.Maps.Pushpin(
    new Microsoft.Maps.Location(props.currentPosition.coords.latitude, props.currentPosition.coords.longitude + 0.001),
    {
      anchor: new Microsoft.Maps.Point(16, 32),
      // color: 'green',
      // cursor: 'pointer',
      draggable: true,
      enableClickedStyle: true,
      enableHoverStyle: true,
      icon: MapMarkerGreen,
      subTitle: 'M1 Subtitle',
      title: 'M1',
      text: 'Test content',
      visible: true,
    }
  );
  // add the pushpin to the map
  map.entities.push(m);
}