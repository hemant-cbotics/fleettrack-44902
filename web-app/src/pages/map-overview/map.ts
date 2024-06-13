import { mapVehicleIconWrapped } from "../../assets/svg/vehicle-wrapped";
import { APP_CONFIG } from "../../constants/constants";
import { customClisteredPinCallback } from "../../utils/map";
import { TDataPoint, TMapOperations, TMapUpdatesHandler, TMPushpin } from "./type";

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
      let angle = mapVehicleStateIconAngle(dataPoint);
      if(angle !== 0) {
        // temporary polyline for testing
        // TODO: remove this line
        const thisPolyline = new Microsoft.Maps.Polyline(
          [
            new Microsoft.Maps.Location(dataPoint.coords[0], dataPoint.coords[1]),
            new Microsoft.Maps.Location(dataPoint.coords[2], dataPoint.coords[3])
          ],
          {
            strokeColor: '#0099DD',
            strokeThickness: 2,
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
              mapVehicleStateIconSlug(dataPoint),
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
    setTimeout(() => mapCenterToDataPoints(props, checkedVehicles), 1000);
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
      mapCenterToDataPoints(props, checkedVehicles);
      break;
    case 'centerToPushpin':
      const pushpinId = value as string;
      const pushpinObject = props.mapRef.current.objects.mPushpins.find((pushpinObject) => pushpinObject.id === pushpinId);
      if(pushpinObject) {
        props.mapRef.current.map.setView({
          center: pushpinObject.pushpin.getLocation(),
          zoom: 15,
          animate: true,
        });
      }
      break;
    case 'focusPushpin':
      const pushpinObj = value as { id: string, focus: boolean };
      const pushpinObjectFocus =
        props.mapRef.current.objects.mPushpins.find(
          (pushpinObject) => pushpinObject.id === pushpinObj.id
        );
      if(pushpinObjectFocus) {
        const dataPoint = props.dataPoints.find(
          (dataPoint) => dataPoint.id === pushpinObj.id
        );
        if(!dataPoint) return;
        pushpinObjectFocus.pushpin.setOptions({
          icon: mapVehicleIconWrapped(
            mapVehicleStateIconSlug(dataPoint),
            pushpinObj.focus,
            mapVehicleStateIconAngle(dataPoint)
          )
        });
      }
      break;
    default:
      break;
  }  
}

// center the map to the visible pushpins
const mapCenterToDataPoints: TMapOperations = (props, value) => {
  const Microsoft = (window as any).Microsoft;
  if(!props.dataPoints || props.dataPoints.length < 1) return;
  const checkedVehicles = value as string[];
  const visibleDataPoints = props.dataPoints.filter((dataPoint) => checkedVehicles.includes(dataPoint.id));
  if(visibleDataPoints.length < 1) return;
  props.mapRef.current.map?.setView({
    bounds: Microsoft.Maps.LocationRect.fromLocations(
      visibleDataPoints
        .map((dataPoint) =>
          new Microsoft.Maps.Location(
            dataPoint.coords[0],
            dataPoint.coords[1]
          )
        )
    ),
    padding: 5,
    animate: true
  });
}

const mapVehicleStateIconSlug = (dataPoint: TDataPoint | undefined) => {
  if(!!dataPoint && dataPoint.coords.length > 2) return 'driving';
  return !!dataPoint && dataPoint.is_active ? 'idle_active' : 'idle_inactive';
}

const mapVehicleStateIconAngle = (dataPoint: TDataPoint) => {
  const Microsoft = (window as any).Microsoft;
  let angle = 0;
  if(dataPoint.coords.length > 2) { // TODO: dissolve this check later and use OranizationVehicle's lat and lon
    // calculate angle for the vehicle icon
    const point1 = { x: dataPoint.coords[0], y: dataPoint.coords[1] }
    const point2 = { x: dataPoint.coords[2], y: dataPoint.coords[3] }
    angle = Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
  }
  return angle;
}
