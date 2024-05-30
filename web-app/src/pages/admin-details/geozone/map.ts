import React from "react";
import MapMarkerRed from "../../../assets/svg/map-marker-red.svg";
import MapMarkerGreen from "../../../assets/svg/map-marker-green.svg";
import { APP_CONFIG } from "../../../constants/constants";
import { TLatLng } from "../../../components/maps/types";

type TMapOperationsProps = {
  mapRef: React.MutableRefObject<any>;
  currentPosition: React.MutableRefObject<TLatLng>;
}

export const mapOperations = (props: TMapOperationsProps) => {

  const Microsoft = (window as any).Microsoft;
  (window as any).map = props.mapRef.current;

  const _center = props.mapRef.current.getCenter(); // deprecated
  const mPushpins = {
    pCentre: null,
    pRadius: null,
  }
  let mCircle: any = null;
  let circleRadius = 0.6;

  const getDistanceFromCenter = (loc1: any, loc2: any) => {
    if(APP_CONFIG.DEBUG.MAPS) console.log('[getDistanceFromCenter]', loc1.getLocation().latitude, loc2.getLocation().longitude);
    return Microsoft.Maps.SpatialMath.getDistanceTo(
      loc1.getLocation(),
      loc2.getLocation(),
      Microsoft.Maps.SpatialMath.DistanceUnits.Miles
    );
  }

  const getCircleLocs = (center: any, radius: any) => {
    // calculate the locations for a regular polygon that has 36 locations which will result in an approximate circle.
    return Microsoft.Maps.SpatialMath.getRegularPolygon(center, radius, 36 * 2, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
  }

  function createCircle(center: any, radius: any, color: any) {
    // Create a contour line that represents a circle.
    return new Microsoft.Maps.ContourLine(getCircleLocs(center, radius), color);
  }

  const renderCircle = (center: any, radiusInMiles: number) => {
    props.mapRef.current.layers.clear();
    mCircle = createCircle(center, radiusInMiles, 'rgba(0,150,50,0.4)');
    const circleLayer = new Microsoft.Maps.ContourLayer(
      [mCircle],
      {
        colorCallback: (val: any) => val,
        polygonOptions: {
          strokeThickness: 2,
          strokeColor: 'rgba(0,100,0,0.5)',
          // fillColor: 'rgba(0,0,0,0.1)',
          visible: true
        }
      }
    );
    props.mapRef.current.layers.insert(circleLayer);
  }

  const renderMapObjects = () => {
    let refCenter = new Microsoft.Maps.Location(
      props.currentPosition.current.latitude,
      props.currentPosition.current.longitude
    )

    // create center pushpin
    mPushpins.pCentre = new Microsoft.Maps.Pushpin(
      refCenter,
      {
        icon: MapMarkerRed,
        anchor: new Microsoft.Maps.Point(16, 32),
        draggable: true,
        subTitle: 'to reposition',
        title: 'Drag',
      }
    );
    props.mapRef.current.entities.push(mPushpins.pCentre); // add the pushpin to the map

    // add event listener for dragend event on the center pushpin
    Microsoft.Maps.Events.addHandler(
      mPushpins.pCentre,
      'dragend',
      (args: any) => {
        // reposition the circle
        const c = mPushpins.pCentre as any;
        const r = mPushpins.pRadius as any;
        refCenter = c.getLocation(); // update the center
        props.currentPosition.current = {
          latitude: refCenter.latitude,
          longitude: refCenter.longitude
        };
        const distanceFromCenter = getDistanceFromCenter(c, r);
        circleRadius = distanceFromCenter; // update the circle radius
        renderCircle(refCenter, distanceFromCenter);
      }
    );

    // create radius pushpin
    mPushpins.pRadius = new Microsoft.Maps.Pushpin(
      Microsoft.Maps.SpatialMath.getDestination(refCenter, 45, circleRadius, Microsoft.Maps.SpatialMath.DistanceUnits.Miles),
      {
        anchor: new Microsoft.Maps.Point(16, 32),
        // color: 'green',
        // cursor: 'pointer',
        draggable: true,
        enableClickedStyle: true,
        enableHoverStyle: true,
        icon: MapMarkerGreen,
        subTitle: 'to resize',
        title: 'Drag',
        // text: 'Test content',
        visible: true,
      }
    );
    props.mapRef.current.entities.push(mPushpins.pRadius); // add the pushpin to the map

    // add event listener for dragend event on the radius pushpin
    Microsoft.Maps.Events.addHandler(
      mPushpins.pRadius,
      'dragend',
      (args: any) => {
        // resize the circle
        const c = mPushpins.pCentre as any;
        const r = mPushpins.pRadius as any;
        const distanceFromCenter = getDistanceFromCenter(c, r);
        circleRadius = distanceFromCenter; // update the circle radius
        renderCircle(refCenter, distanceFromCenter);
      }
    );

    // render the circle
    renderCircle(refCenter, circleRadius);
  }

  // load map modules before rendering the map objects
  Microsoft.Maps.loadModule(
    [
      'Microsoft.Maps.SpatialMath',
      'Microsoft.Maps.Contour',
      // 'Microsoft.Maps.Clustering', // clustering module
    ],
    () => {

      // render the map objects
      renderMapObjects();

      // Create a ClusterLayer and add it to the map.
      // var clusterLayer = new Microsoft.Maps.ClusterLayer(pins);
      // (thisMap as any).layers.insert(clusterLayer);
      
    }
  );
}