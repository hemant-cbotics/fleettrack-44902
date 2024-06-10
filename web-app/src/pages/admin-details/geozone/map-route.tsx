import { APP_CONFIG } from "../../../constants/constants";
import i18n from "../../../services/i18n";
import { ColorRGB } from "../../../types/common";
import {
  TGeozoneMapData,
  TGeozoneMapDataRoute,
  TLatLng,
} from "../../../types/map";
import { renderRoute } from "../../../utils/map";
import { TMapOperationsProps, TMapUpdatesHandler } from "./type";
import MapMarkerRed from "../../../assets/svg/map-marker-red.svg";

const dragLabelCenter = {
  // subTitle: "to reposition",
  // title: "Drag",
};
const dragLabelPoints = {
  // subTitle: "to reshape",
  // title: "Drag",
};

export const mapOperations = (props: TMapOperationsProps) => {

  const Microsoft = (window as any).Microsoft;
  (window as any).map = props.mapRef.current;

  // create a namespace for map objects
  props.mapRef.current.objects = {
    mPushpins: {
      pCentre: null,
      rPoints: [],
    },
    mRoutes: [],
    mInfobox: null,
    circleRadius:
      (props.mapData as TGeozoneMapDataRoute).locs ?? APP_CONFIG.MAPS.DEFAULTS.RADIUS,
  };

  const renderMapObjects = () => {
    const color = (props.mapData.color ?? APP_CONFIG.MAPS.DEFAULTS.ZONE_COLOR) as ColorRGB;
    let refCenter = new Microsoft.Maps.Location(
      (props.mapData as TGeozoneMapDataRoute).centerPosition.latitude,
      (props.mapData as TGeozoneMapDataRoute).centerPosition.longitude
    );
    if (APP_CONFIG.DEBUG.MAPS)
      console.log(
        "Dropping center at",
        refCenter.latitude,
        refCenter.longitude
      );
    props.mapRef.current.map.setView({ center: refCenter }); // set the view to the center

    // TODO: uncertain if routes can have a centre pushpin
    // create center pushpin
    props.mapRef.current.objects.mPushpins.pCentre = new Microsoft.Maps.Pushpin(
      refCenter,
      {
        anchor: new Microsoft.Maps.Point(16, 32),
        color: `rgba(${color.join(",")},0.2)`,
        // icon: MapMarkerRed,
        visible: props.mapData.editable,
        draggable: props.mapData.editable,
        ...(props.mapData.editable ? dragLabelCenter : {}),
      }
    );

    // get the route points
    let routePoints =
      !!(props.mapData as TGeozoneMapDataRoute).locs
      ? (props.mapData as TGeozoneMapDataRoute).locs.map((point: TLatLng) => new Microsoft.Maps.Location(point.latitude, point.longitude))
      : [];
    if(APP_CONFIG.DEBUG.MAPS) console.log("routePoints", routePoints);

    // create pushpins for the route points
    routePoints.forEach((routePoint: any, index: number) => {
      const newPushpin = new Microsoft.Maps.Pushpin(routePoint, {
        anchor: new Microsoft.Maps.Point(16, 32),
        icon: MapMarkerRed,
        visible: props.mapData.editable,
        draggable: props.mapData.editable,
        ...(props.mapData.editable ? dragLabelPoints : {}),
      });
      props.mapRef.current.map.entities.push(newPushpin);
      props.mapRef.current.objects.mPushpins.rPoints.push(newPushpin);
    });

    // event listener to add a route point when user clicks on the map
    Microsoft.Maps.Events.addHandler(
      props.mapRef.current.map,
      "click",
      function (e: any) {
        if(!props.mapData.editable) return; // do nothing if not editable

        // Get the location of the click event
        const location = e.location;

        // Add the location to the routePoints array
        routePoints.push(location);

        // use the route points to create pushpins
        const newPushpin = new Microsoft.Maps.Pushpin(e.location, {
          anchor: new Microsoft.Maps.Point(16, 32),
          icon: MapMarkerRed,
          visible: props.mapData.editable,
          draggable: props.mapData.editable,
          ...(props.mapData.editable ? dragLabelPoints : {}),
        });
        props.mapRef.current.map.entities.push(newPushpin);

        // dragend event for the new pushpin
        Microsoft.Maps.Events.addHandler(newPushpin, "dragend", (args: any) => {
          // redraw the route
          const routePointLocations = props.mapRef.current.objects.mPushpins.rPoints.map(
            (point: any) => point.getLocation()
          );
          routePoints = routePointLocations;
          console.log("routePointLocations", routePointLocations);
          // Draw the new route
          renderRoute(
            props.mapRef,
            refCenter,
            routePointLocations,
            color
          );
          // update the map data
          console.log("[setMapData] via mapOperations (radius dragend)");
        });

        // update the map data
        props.mapRef.current.objects.mPushpins.rPoints.push(newPushpin);
        const routePointLocations = props.mapRef.current.objects.mPushpins.rPoints.map(
          (point: any) => point.getLocation()
        );
        props.setMapData({
            ...props.mapData,
            centerPosition: {
              latitude: refCenter.latitude,
              longitude: refCenter.longitude
            },
            locs: routePointLocations.map((point: any) => ({ latitude: point.latitude, longitude: point.longitude } as TLatLng)),
          } as TGeozoneMapData
        );
        renderRoute(props.mapRef, refCenter, routePoints, color);
      }
    );

    // dragend event for existing pushpins
    props.mapRef.current.objects.mPushpins.rPoints.map((pushpin: any) => {
      Microsoft.Maps.Events.addHandler(pushpin, "dragend", (args: any) => {
        // redraw the route
        const routePointLocations = props.mapRef.current.objects.mPushpins.rPoints.map(
          (point: any) => point.getLocation()
        );
        routePoints = routePointLocations;
        console.log("routePointLocations", routePointLocations);
        // Draw the new route
        renderRoute(props.mapRef, refCenter, routePointLocations, color);
        // update the map data
        console.log("[setMapData] via mapOperations (radius dragend)");
        props.setMapData({
            ...props.mapData,
            centerPosition: {
              latitude: refCenter.latitude,
              longitude: refCenter.longitude
            },
            locs: routePointLocations.map((point: any) => ({ latitude: point.latitude, longitude: point.longitude } as TLatLng)),
          } as TGeozoneMapData
        );
      });
    });

    // render the polygon
    renderRoute(props.mapRef, refCenter, routePoints, color);
  };

  // load map modules before rendering the map objects
  Microsoft.Maps.loadModule(
    [
      "Microsoft.Maps.SpatialMath",
      "Microsoft.Maps.Contour",
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
};

export const mapUpdatesHandler: TMapUpdatesHandler = (props, action, value) => {
  if (APP_CONFIG.DEBUG.MAPS) console.log("[mapUpdatesHandler]", action, value);

  const Microsoft = (window as any).Microsoft;
  const refCenter = props.mapRef.current.map.getCenter();

  switch (action) {
    case "edit":
      // edge pushpins are draggable
      props.mapRef.current.objects.mPushpins?.rPoints?.forEach(
        (pushpin: any) => {
          pushpin.setOptions({
            visible: value,
            draggable: value,
            // ...(value ? dragLabelPoints : {})
          });
        }
      );
      // show the infobox
      if(false) {
        props.mapRef.current.objects.mInfobox = new Microsoft.Maps.Infobox(
          refCenter,
          {
            title: i18n.t("admins.geozones.detailsPage.map.routeEdit.heading"),
            description: i18n.t(
              "admins.geozones.detailsPage.map.routeEdit.sub_heading"
            ),
            showPointer: false,
            // showCloseButton: false,
            visible: false,
            actions: [
              {
                label: i18n.t(
                  "admins.geozones.detailsPage.map.routeEdit.ok_button"
                ),
                eventHandler: () => {
                  // close info box
                  props.mapRef.current.objects.mInfobox.setOptions({
                    visible: false,
                  });
                },
              },
            ],
          }
        );
        props.mapRef.current.objects.mInfobox.setMap(props.mapRef.current.map);
        props.mapRef.current.objects.mInfobox.setOptions({ visible: true });
        setTimeout(() => {
          const infoboxElement = (window as any).document.querySelector(
            ".MicrosoftMap .Infobox"
          )?.parentNode;
          if (infoboxElement) {
            (infoboxElement as any).style.transition = "all 0.5s ease 0s";
            (infoboxElement as any).style.left = "20px";
            (infoboxElement as any).style.top = "20px";
          }
        }, 100);
      }
      break;
    default:
      break;
  }
};
