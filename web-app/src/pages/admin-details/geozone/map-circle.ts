import React from "react";
import MapMarkerRed from "../../../assets/svg/map-marker-red.svg";
import MapMarkerBlue from "../../../assets/svg/map-marker-blue.svg";
import { APP_CONFIG } from "../../../constants/constants";
import { TGeozoneMapData, TGeozoneMapDataCircle } from "../../../types/map";
import { TMapOperations, TMapUpdatesHandler } from "./type";
import { getDistanceFromCenter, renderCircle } from "../../../utils/map";
import { ColorRGB } from "../../../types/common";

const dragLabelCenter = {
  // subTitle: 'to reposition',
  // title: 'Drag',
}
const dragLabelRadius = {
  // subTitle: 'to resize',
  // title: 'Drag',
}

export const mapOperations: TMapOperations = (props) => {

  const Microsoft = (window as any).Microsoft;
  (window as any).map = props.mapRef.current;

  // create a namespace for map objects
  props.mapRef.current.objects = {
    mPushpins: {
      pCentre: null,
      pRadius: null,
    },
    mCircle: null,
    circleRadius: (props.mapData as TGeozoneMapDataCircle).radius ?? APP_CONFIG.MAPS.DEFAULTS.RADIUS,
    mRadiusLine: null,
  }

  const renderMapObjects = () => {
    const color = (props.mapData.color ?? APP_CONFIG.MAPS.DEFAULTS.ZONE_COLOR) as ColorRGB;
    let refCenter = new Microsoft.Maps.Location(
      (props.mapData as TGeozoneMapDataCircle).centerPosition.latitude,
      (props.mapData as TGeozoneMapDataCircle).centerPosition.longitude
    )
    if(APP_CONFIG.DEBUG.MAPS) console.log('Dropping center at', refCenter.latitude, refCenter.longitude);
    props.mapRef.current.map.setView({ center: refCenter }); // set the view to the center

    // create center pushpin
    props.mapRef.current.objects.mPushpins.pCentre = new Microsoft.Maps.Pushpin(
      refCenter,
      {
        anchor: new Microsoft.Maps.Point(16, 32),
        icon: MapMarkerBlue,
        draggable: props.mapData.editable,
        ...(props.mapData.editable ? dragLabelCenter : {})
      }
    );
    props.mapRef.current.map.entities.push(props.mapRef.current.objects.mPushpins.pCentre); // add the pushpin to the map

    // add event listener for dragend event on the center pushpin
    Microsoft.Maps.Events.addHandler(
      props.mapRef.current.objects.mPushpins.pCentre,
      'dragend',
      (args: any) => {
        // reposition the circle
        const c = props.mapRef.current.objects.mPushpins.pCentre as any;
        const r = props.mapRef.current.objects.mPushpins.pRadius as any;
        refCenter = c.getLocation(); // update the center
        r.setLocation(
          Microsoft.Maps.SpatialMath.getDestination(refCenter, 45, props.mapRef.current.objects.circleRadius, Microsoft.Maps.SpatialMath.DistanceUnits.Miles)
        );
        const distanceFromCenter = getDistanceFromCenter(c, r);
        props.mapRef.current.objects.circleRadius = distanceFromCenter; // update the circle radius
        renderCircle(props.mapRef, refCenter, distanceFromCenter, color);
        // update radius line
        props.mapRef.current.objects.mRadiusLine?.setLocations([
          props.mapRef.current.objects.mPushpins.pCentre.getLocation(),
          props.mapRef.current.objects.mPushpins.pRadius.getLocation()
        ]);
        // update the map data
        console.log('[setMapData] via mapOperations (center dragend)');
        props.setMapData({
            ...props.mapData,
            centerPosition: {
              latitude: refCenter.latitude,
              longitude: refCenter.longitude
            },
            radius: props.mapRef.current.objects.circleRadius,
          } as TGeozoneMapData
        );
      }
    );

    // create radius pushpin
    props.mapRef.current.objects.mPushpins.pRadius = new Microsoft.Maps.Pushpin(
      Microsoft.Maps.SpatialMath.getDestination(refCenter, 45, props.mapRef.current.objects.circleRadius, Microsoft.Maps.SpatialMath.DistanceUnits.Miles),
      {
        anchor: new Microsoft.Maps.Point(16, 32),
        icon: MapMarkerRed,
        draggable: props.mapData.editable,
        ...(props.mapData.editable ? dragLabelRadius : {})
      }
    );
    props.mapRef.current.map.entities.push(props.mapRef.current.objects.mPushpins.pRadius); // add the pushpin to the map

    // create radius line
    props.mapRef.current.objects.mRadiusLine = new Microsoft.Maps.Polyline([
      props.mapRef.current.objects.mPushpins.pCentre.getLocation(),
      props.mapRef.current.objects.mPushpins.pRadius.getLocation()
    ], {
      strokeColor: new Microsoft.Maps.Color(200, color[0], color[1], color[2]),
      strokeThickness: 2,
      strokeDashArray: [4, 4]
    });
    props.mapRef.current.map.entities.push(props.mapRef.current.objects.mRadiusLine);

    // add event listener for dragend event on the radius pushpin
    Microsoft.Maps.Events.addHandler(
      props.mapRef.current.objects.mPushpins.pRadius,
      'dragend',
      (args: any) => {
        // resize the circle
        const c = props.mapRef.current.objects.mPushpins.pCentre as any;
        const r = props.mapRef.current.objects.mPushpins.pRadius as any;
        const distanceFromCenter = getDistanceFromCenter(c, r);
        props.mapRef.current.objects.circleRadius = distanceFromCenter; // update the circle radius
        renderCircle(props.mapRef, refCenter, distanceFromCenter, color);
        // update radius line
        props.mapRef.current.objects.mRadiusLine?.setLocations([
          props.mapRef.current.objects.mPushpins.pCentre.getLocation(),
          props.mapRef.current.objects.mPushpins.pRadius.getLocation()
        ]);
        // update the map data
        console.log('[setMapData] via mapOperations (radius dragend)');
        props.setMapData({
            ...props.mapData,
            centerPosition: {
              latitude: refCenter.latitude,
              longitude: refCenter.longitude
            },
            radius: props.mapRef.current.objects.circleRadius,
          } as TGeozoneMapData
        );
      }
    );

    // render the circle
    renderCircle(props.mapRef, refCenter, props.mapRef.current.objects.circleRadius, color);
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

  return null;
}

export const mapUpdatesHandler: TMapUpdatesHandler = (props, action, value) => {
  if(APP_CONFIG.DEBUG.MAPS) console.log('[mapUpdatesHandler]', action, value);
  switch(action) {
    case 'edit':
      props.mapRef.current.objects.mPushpins?.pCentre?.setOptions({
        draggable: value,
        ...(value ? dragLabelCenter : {})
      });
      props.mapRef.current.objects.mPushpins?.pRadius?.setOptions({
        draggable: value,
        ...(value ? dragLabelRadius : {})
      });
      break;
    default:
      break;
  }  
}