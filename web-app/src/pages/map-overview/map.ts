import { mapVehicleIconWrapped } from "../../assets/svg/vehicle-wrapped";
import { APP_CONFIG } from "../../constants/constants";
import { customClisteredPinCallback } from "../../utils/map";
import { TMapOperations, TMapUpdatesHandler, TMPushpin } from "./type";

export const mapOperations: TMapOperations = (props, checkedVehicles) => {

  const Microsoft = (window as any).Microsoft;
  (window as any).map = props.mapRef.current;

  // create a namespace for map objects
  props.mapRef.current.objects = {
    mPushpins: [],
    mClusterLayer: null,
  }

  const renderMapObjects = () => {
    // create pushpins
    props.dataPoints.forEach((dataPoint) => {
      let angle = 0;
      if(dataPoint.coords.length > 2) {
        console.log('dataPoint', dataPoint)
        const point1 = { x: dataPoint.coords[0], y: dataPoint.coords[1] }
        const point2 = { x: dataPoint.coords[2], y: dataPoint.coords[3] }
        angle = Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
        console.log('angle', angle)
        const thisPolyline = new Microsoft.Maps.Polyline(
          [
            new Microsoft.Maps.Location(dataPoint.coords[0], dataPoint.coords[1]),
            new Microsoft.Maps.Location(dataPoint.coords[2], dataPoint.coords[3])
          ],
          {
            strokeColor: 'blue',
            strokeThickness: 5,
          }
        );
        props.mapRef.current.map.entities.push(thisPolyline);
      }
      const thisPushpin = new Microsoft.Maps.Pushpin(
        new Microsoft.Maps.Location(dataPoint.coords[0], dataPoint.coords[1]),
        {
          anchor: new Microsoft.Maps.Point(
            APP_CONFIG.MAPS.VEHICLE_ICON_SIZE / 2,
            APP_CONFIG.MAPS.VEHICLE_ICON_SIZE / 2
          ),
          icon:
            mapVehicleIconWrapped(
              dataPoint.coords.length > 2
              ? 'driving'
              : dataPoint.is_active
              ? 'idle_active' : 'idle_inactive',
              false,
              angle
            ),
          visible: checkedVehicles.includes(dataPoint.id),
        }
      );
      const thisPushpinObject: TMPushpin = {
        id: dataPoint.id,
        pushpin: thisPushpin,
      }
      // props.mapRef.current.map.entities.push(thisPushpin); // add the pushpin to the map
      props.mapRef.current.objects.mPushpins.push(thisPushpinObject); // add the pushpin to the objects
      if(APP_CONFIG.DEBUG.MAPS) console.log('Dropping pushpin at', dataPoint.coords[0], dataPoint.coords[1]);
    });

    // Create a ClusterLayer and add it to the map.
    props.mapRef.current.objects.mClusterLayer = new Microsoft.Maps.ClusterLayer(
      props.mapRef.current.objects.mPushpins.map((pushpinObject) => pushpinObject.pushpin),
      {
        clusteredPinCallback: customClisteredPinCallback
      }
    );
    props.mapRef.current.map.layers.insert(props.mapRef.current.objects.mClusterLayer);

    // center the map to the polygon
    setTimeout(() => centerMapToDataPoints(), 1000);

    const centerMapToDataPoints = () => {
      if(!props.dataPoints || props.dataPoints.length < 1) return;
      props.mapRef.current.map.setView({
        bounds: Microsoft.Maps.LocationRect.fromLocations(
          props.dataPoints.map((dataPoint) =>
            new Microsoft.Maps.Location(
              dataPoint.coords[0],
              dataPoint.coords[1]
            ))
        ),
        padding: 5
      });
    }
  }

  // load map modules before rendering the map objects
  Microsoft.Maps.loadModule(
    [
      'Microsoft.Maps.SpatialMath',
      'Microsoft.Maps.Contour',
      'Microsoft.Maps.Clustering',
    ],
    () => {

      // render the map objects
      renderMapObjects();
      
    }
  );

  return null;
}

export const mapUpdatesHandler: TMapUpdatesHandler = (props, action, value) => {
  if(APP_CONFIG.DEBUG.MAPS) console.log('[mapUpdatesHandler]', action, value);
  switch(action) {
    case 'checkedUpdated':
      const checkedVehicles = value as string[];
      props.mapRef.current.objects.mPushpins.forEach((pushpinObject) => {
        pushpinObject.pushpin.setOptions({
          visible: checkedVehicles.includes(pushpinObject.id)
        });
      });
      props.mapRef.current.objects.mClusterLayer?.setPushpins(
        props.mapRef.current.objects.mPushpins
          .filter((pushpin) => checkedVehicles.includes(pushpin.id))
          .map((pushpinObject) => pushpinObject.pushpin)
      );
      break;
    default:
      break;
  }  
}

