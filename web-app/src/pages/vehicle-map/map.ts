import { mapVehicleIconWrapped } from "../../assets/svg/vehicle-wrapped";
import { APP_CONFIG } from "../../constants/constants";
import { customClisteredPinCallback } from "../../utils/map";
import { TMapOperations, TMapOperationsProps, TMPushpin, TVehicleDataPoint } from "./type";

export const mapOperations: TMapOperations = (props, filteredDataPoints) => {

  const Microsoft = (window as any).Microsoft;
  (window as any).map = props.mapRef.current;

  // create a namespace for map objects
  props.mapRef.current.objects = {
    mPushpins: [],
    mClusterLayer: null,
  }

  const renderMapObjects = () => {
    // create pushpins
    // props.dataPoints.forEach((dataPoint) => {
    //   // create a pushpin
    //   const thisPushpin = new Microsoft.Maps.Pushpin(
    //     new Microsoft.Maps.Location(dataPoint.coords.latitude, dataPoint.coords.longitude),
    //     {
    //       anchor: new Microsoft.Maps.Point(
    //         APP_CONFIG.MAPS.VEHICLE_ICON_SIZE / 2,
    //         APP_CONFIG.MAPS.VEHICLE_ICON_SIZE / 2
    //       ),
    //       icon:
    //         mapVehicleIconWrapped(
    //           mapVehicleStateIconSlug(dataPoint),
    //           false,
    //           0
    //         ),
    //       visible: checkedVehicles.includes(dataPoint.id),
    //     }
    //   );
    //   // create an infobox for the pushpin
    //   const thisPushpinInfoBox = new Microsoft.Maps.Infobox(
    //     new Microsoft.Maps.Location(dataPoint.coords[0], dataPoint.coords[1]),
    //     {
    //       htmlContent: mapInfoBoxContent(dataPoint),
    //       visible: false,
    //       showPointer: false,
    //       showCloseButton: false,
    //       // offset: new Microsoft.Maps.Point(-(64 + 8), 12) // for w-32 p-2 // infobox shows above the pushpin
    //       offset: new Microsoft.Maps.Point(16, -16), // infobox shows right of the pushpin
    //       zIndex: APP_CONFIG.MAPS.INFOBOX_ZINDEX,
    //     }
    //   );
    //   thisPushpinInfoBox.setMap(props.mapRef.current.map); // add the infobox to the map
    //   // add event listeners
    //   Microsoft.Maps.Events.addHandler(thisPushpin, 'mouseover', (e: any) => {
    //     thisPushpinInfoBox.setOptions({ visible: true });
    //   });
    //   Microsoft.Maps.Events.addHandler(thisPushpin, 'mouseout', (e: any) => {
    //     thisPushpinInfoBox.setOptions({ visible: mapGetPushpinCountWithinMapBounds(props) <= APP_CONFIG.MAPS.SHOW_INFOBOX_PUSHPIN_THRESHOLD ? true : false });
    //   });
    //   Microsoft.Maps.Events.addHandler(thisPushpin, 'click', (e: any) => {
    //     props.onDataPointPushpinClick?.(dataPoint);
    //   });
      
    //   const thisPushpinObject: TMPushpin = {
    //     id: dataPoint.id,
    //     pushpin: thisPushpin,
    //     infobox: thisPushpinInfoBox,
    //   }
    //   // props.mapRef.current.map.entities.push(thisPushpin); // add the pushpin to the map
    //   props.mapRef.current.objects.mPushpins.push(thisPushpinObject); // add the pushpin to the objects
    //   if(APP_CONFIG.DEBUG.MAPS) console.log('Dropping pushpin at', dataPoint.coords[0], dataPoint.coords[1]);
    // });

    // Create a ClusterLayer and add it to the map.
    props.mapRef.current.objects.mClusterLayer = new Microsoft.Maps.ClusterLayer(
      props.mapRef.current.objects.mPushpins.map((pushpinObject) => pushpinObject.pushpin),
      {
        clusteredPinCallback: customClisteredPinCallback
      }
    );
    props.mapRef.current.map.layers.insert(props.mapRef.current.objects.mClusterLayer);
    props.mapRef.current.objects.mClusterLayer.setOptions({
      clusteringEnabled: props.mapLayerOptions?.clustering,
      // visible: true,
      // gridSize: APP_CONFIG.MAPS.CLUSTER_GRID_SIZE,
      // clusterPlacementType: Microsoft.Maps.ClusterPlacementType.Grid,
      // icon: mapVehicleIconWrapped('cluster', false, 0),
      // iconTemplate: mapVehicleIconWrapped('cluster', false, 0),
      // textOffset: new Microsoft.Maps.Point(0, 0),
      // textTemplate: '{pointCount}',
      // textOffset: new Microsoft.Maps.Point(0, 0),
      // textOptions: {
      //   visible: true,
      //   color: '#FFFFFF',
      //   fontSize: 12,
      //   fontFamily: 'Segoe UI, sans-serif',
      //   textAnchor: Microsoft.Maps.Anchor.Center,
      // },
    });

    // center the map to the polygon
    // setTimeout(() => mapCenterToDataPoints(props, checkedVehicles), 1000);

    // zoom event listener
    Microsoft.Maps.Events.addHandler(props.mapRef.current.map, 'viewchangeend', () => handleMapViewChangeEnd(props));
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

// center the map to the visible pushpins
const mapCenterToDataPoints: TMapOperations = (props, value) => {
  const Microsoft = (window as any).Microsoft;
  if(!props.dataPoints || props.dataPoints.length < 1) return;
  // const checkedVehicles = value as string[];
  const visibleDataPoints = props.dataPoints.filter((item) => true) // TODO: fix this // (dataPoint) => checkedVehicles.includes(dataPoint.id));
  if(visibleDataPoints.length < 1) return;
  props.mapRef.current.map?.setView({
    bounds: Microsoft.Maps.LocationRect.fromLocations(
      // visibleDataPoints
      props.dataPoints
        .map((dataPoint) =>
          new Microsoft.Maps.Location(
            dataPoint.coords.latitude,
            dataPoint.coords.longitude
          )
        )
    ),
    padding: 5,
    animate: true
  });
  // show the infobox if there is only 6 (APP_CONFIG.MAPS.SHOW_INFOBOX_PUSHPIN_THRESHOLD) or less visible pushpins
  // const pushpinsWithinBounds = mapGetPushpinCountWithinMapBounds(props)
  if(visibleDataPoints.length <= APP_CONFIG.MAPS.SHOW_INFOBOX_PUSHPIN_THRESHOLD
  // && pushpinsWithinBounds <= APP_CONFIG.MAPS.SHOW_INFOBOX_PUSHPIN_THRESHOLD
  ) {
    // visibleDataPoints.forEach((dataPoint) => {
    //   const pushpinObject = props.mapRef.current.objects.mPushpins.find((pushpinObject) => pushpinObject.id === dataPoint.id);
    //   if(pushpinObject) {
    //     pushpinObject.infobox.setOptions({
    //       visible: true
    //     });
    //   }
    // });
  } else {
    props.mapRef.current.objects.mPushpins.forEach((pushpinObject) => {
      pushpinObject.infobox.setOptions({
        visible: false
      });
    });
  }
  // limit the zoom level to 7
  if(visibleDataPoints.length === 1
  && props.mapRef.current.map.getZoom() > 7) {
    props.mapRef.current.map.setView({
      zoom: 7,
      animate: true
    });
  }
}

export const mapVehicleStateIconSlug = (dataPoint: TVehicleDataPoint | undefined) => {
  // if(!!dataPoint && dataPoint.coords.length > 2) return 'driving';
  // return !!dataPoint && dataPoint.is_active ? 'idle_active' : 'idle_inactive';
  return 'mapVehicleStateIconSlug'
}

// const mapVehicleStateIconAngle = (dataPoint: TVehicleDataPoint) => {
//   const Microsoft = (window as any).Microsoft;
//   let angle = 0;
//   if(dataPoint.coords.length > 2) { // TODO: dissolve this check later and use OranizationVehicle's lat and lon
//     // calculate angle for the vehicle icon
//     const point1 = { x: dataPoint.coords[0], y: dataPoint.coords[1] }
//     const point2 = { x: dataPoint.coords[2], y: dataPoint.coords[3] }
//     angle = Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
//   }
//   return angle;
// }

const mapGetPushpinCountWithinMapBounds = (props: TMapOperationsProps) => {
  const mapBounds = props.mapRef?.current?.map?.getBounds();
  if(!mapBounds) return 0;
  const pushpins = props.mapRef.current.objects.mPushpins;
  return pushpins.filter(
    (pushpinObject) =>
      mapPushpinLiesWithinMapBounds(pushpinObject.pushpin, props.mapRef?.current?.map)
  ).length;
}

const mapPushpinLiesWithinMapBounds = (pushpin: any, mapObj: any) => {
  const mapBounds = mapObj.getBounds();
  if(!mapBounds) return false;
  return mapBounds.contains(pushpin.getLocation()) && pushpin.getVisible();
}

const handleMapViewChangeEnd = (props: TMapOperationsProps) => {
  const pushpinCountWithinMapBounds = mapGetPushpinCountWithinMapBounds(props);
  const showInfoboxes = pushpinCountWithinMapBounds <= APP_CONFIG.MAPS.SHOW_INFOBOX_PUSHPIN_THRESHOLD;
  if(APP_CONFIG.DEBUG.MAPS) console.log(`viewchangeend count: ${pushpinCountWithinMapBounds} showInfoboxes: ${showInfoboxes}`);
  
  // update mapState with new center and zoom
  if(!!props.mapRef.current.map?.getCenter) {
    props?.onViewChangeEnd?.(
      {
        latitude: props.mapRef.current.map?.getCenter().latitude,
        longitude: props.mapRef.current.map?.getCenter().longitude
      },
      props.mapRef.current.map.getZoom()
    );
  }

  if(showInfoboxes) {
    // show infoboxes for pushpins within the map bounds
    props.mapRef.current.objects.mPushpins
      .filter((pushpinObject) => {
        const loc = pushpinObject.pushpin.getLocation();
        return props.mapRef.current.map.getBounds().contains(loc);
      })
      .forEach((pushpinObject) => {
        // setTimeout(() => {
          pushpinObject.infobox.setOptions({
            visible: // true
              mapPushpinLiesWithinMapBounds(pushpinObject.pushpin, props.mapRef.current.map)
              // pushpinObject.pushpin.getVisible() &&
              // props.mapRef.current.objects.mPushpins.filter((pushpinObject) => {
              //   const loc = pushpinObject.pushpin.getLocation();
              //   return props.mapRef.current.map.getBounds().contains(loc);
              // }).length <= APP_CONFIG.MAPS.SHOW_INFOBOX_PUSHPIN_THRESHOLD
          });
        // }, 100);
      });
  } else {
    // hide all infoboxes
    props.mapRef.current.objects.mPushpins.forEach((pushpinObject) => {
      pushpinObject.infobox.setOptions({ visible: false });
    });
  }
}