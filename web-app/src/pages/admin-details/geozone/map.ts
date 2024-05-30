import React from "react";
import MapMarkerRed from "../../../assets/svg/map-marker-red.svg";
import MapMarkerGreen from "../../../assets/svg/map-marker-green.svg";
import { APP_CONFIG } from "../../../constants/constants";
import { TGeozoneMapData, TGeozoneMapDataCircle, TLatLng } from "../../../components/maps/types";
import { TMapRef } from "./type";
import { MAP_DEFAULTS } from "./constants";

const dragLabelCenter = {
  subTitle: 'to reposition',
  title: 'Drag',
}
const dragLabelRadius = {
  subTitle: 'to resize',
  title: 'Drag',
}

type TMapOperationsProps = {
  mapRef: React.MutableRefObject<TMapRef>;
  mapData: TGeozoneMapData;
  setMapData: React.Dispatch<React.SetStateAction<TGeozoneMapData>>;
}

export const mapOperations = (props: TMapOperationsProps) => {

  const Microsoft = (window as any).Microsoft;
  (window as any).map = props.mapRef.current;

  // create a namespace for map objects
  props.mapRef.current.objects = {
    mPushpins: {
      pCentre: null,
      pRadius: null,
    },
    mCircle: null,
    circleRadius: (props.mapData as TGeozoneMapDataCircle).radius ?? MAP_DEFAULTS.RADIUS,
  }

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
    if(APP_CONFIG.DEBUG.MAPS) console.log('Rendering circle at', center.latitude, center.longitude, 'with radius', radiusInMiles);
    props.mapRef.current.map.layers.clear();
    props.mapRef.current.objects.mCircle = createCircle(center, radiusInMiles, 'rgba(0,150,50,0.4)');
    const circleLayer = new Microsoft.Maps.ContourLayer(
      [props.mapRef.current.objects.mCircle],
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
    props.mapRef.current.map.layers.insert(circleLayer);
  }

  const renderMapObjects = () => {
    let refCenter = new Microsoft.Maps.Location(
      (props.mapData as TGeozoneMapDataCircle).centerPosition.latitude,
      (props.mapData as TGeozoneMapDataCircle).centerPosition.longitude
    )
    if(APP_CONFIG.DEBUG.MAPS) console.log('Dropping center at', refCenter.latitude, refCenter.longitude);

    // create center pushpin
    props.mapRef.current.objects.mPushpins.pCentre = new Microsoft.Maps.Pushpin(
      refCenter,
      {
        anchor: new Microsoft.Maps.Point(16, 32),
        icon: MapMarkerRed,
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
        renderCircle(refCenter, distanceFromCenter);
        // update the map data
        console.log('[setMapData] via mapOperations (center dragend)');
        props.setMapData(
          data =>
          ({
            ...data,
            centerPosition: {
              latitude: refCenter.latitude,
              longitude: refCenter.longitude
            },
            radius: props.mapRef.current.objects.circleRadius,
          } as TGeozoneMapData)
        );
      }
    );

    // create radius pushpin
    props.mapRef.current.objects.mPushpins.pRadius = new Microsoft.Maps.Pushpin(
      Microsoft.Maps.SpatialMath.getDestination(refCenter, 45, props.mapRef.current.objects.circleRadius, Microsoft.Maps.SpatialMath.DistanceUnits.Miles),
      {
        anchor: new Microsoft.Maps.Point(16, 32),
        icon: MapMarkerGreen,
        draggable: props.mapData.editable,
        ...(props.mapData.editable ? dragLabelRadius : {})
      }
    );
    props.mapRef.current.map.entities.push(props.mapRef.current.objects.mPushpins.pRadius); // add the pushpin to the map

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
        renderCircle(refCenter, distanceFromCenter);
        // update the map data
        console.log('[setMapData] via mapOperations (radius dragend)');
        props.setMapData(
          data =>
          ({
            ...data,
            centerPosition: {
              latitude: refCenter.latitude,
              longitude: refCenter.longitude
            },
            radius: props.mapRef.current.objects.circleRadius,
          } as TGeozoneMapData)
        );
      }
    );

    // render the circle
    renderCircle(refCenter, props.mapRef.current.objects.circleRadius);
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

type TMapUpdatesHandler = (props: TMapOperationsProps, action: 'edit', value?: any) => void;

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