import React from "react";
import MapMarkerRed from "../../../assets/svg/map-marker-red.svg";
import { APP_CONFIG } from "../../../constants/constants";
import { TGeozoneMapData, TGeozoneMapDataPolygon, TLatLng } from "../../../types/map";
import { TMapOperationsProps, TMapUpdatesHandler } from "./type";
import { getCircleLocs, renderPolygon } from "../../../utils/map";
import { ColorRGB } from "../../../types/common";
import i18n from "../../../services/i18n";

const dragLabelCenter = {
  // subTitle: 'to reposition',
  // title: 'Drag',
}
const dragLabelPoints = {
  // subTitle: 'to reshape',
  // title: 'Drag',
}
const polygonColorRGB: ColorRGB = [150, 0, 50];

export const mapOperations = (props: TMapOperationsProps) => {

  const Microsoft = (window as any).Microsoft;
  (window as any).map = props.mapRef.current;

  // create a namespace for map objects
  props.mapRef.current.objects = {
    mPushpins: {
      pCentre: null,
      pPoints: [],
    },
    mPolygon: null,
    mInfobox: null,
    circleRadius: (props.mapData as TGeozoneMapDataPolygon).locs ?? APP_CONFIG.MAPS.DEFAULTS.RADIUS,
  }

  const renderMapObjects = () => {
    let refCenter = new Microsoft.Maps.Location(
      (props.mapData as TGeozoneMapDataPolygon).centerPosition.latitude,
      (props.mapData as TGeozoneMapDataPolygon).centerPosition.longitude
    )
    if(APP_CONFIG.DEBUG.MAPS) console.log('Dropping center at', refCenter.latitude, refCenter.longitude);
    props.mapRef.current.map.setView({ center: refCenter }); // set the view to the center

    // TODO: uncertain if polygon can have a centre pushpin
    // create center pushpin
    props.mapRef.current.objects.mPushpins.pCentre = new Microsoft.Maps.Pushpin(
      refCenter,
      {
        anchor: new Microsoft.Maps.Point(16, 32),
        color: `rgba(${polygonColorRGB.join(',')},0.2)`,
        // icon: MapMarkerRed,
        draggable: props.mapData.editable,
        ...(props.mapData.editable ? dragLabelCenter : {})
      }
    );
    props.mapRef.current.map.entities.push(props.mapRef.current.objects.mPushpins.pCentre); // add the pushpin to the map

    // ------------------------------------------------------------------------------------------------------------
    // TODO: when editing a polygon, we identified that extra pushpins is added to the map - this needs to be fixed
    // ------------------------------------------------------------------------------------------------------------

    // let initialPoints = 
    // initialPoints.pop(); // remove the last point to avoid duplication
    // load from saved polygon points or get the default polygon points
    const polygonPoints =
      !!(props.mapData as TGeozoneMapDataPolygon).locs
        ? (props.mapData as TGeozoneMapDataPolygon).locs.map((point: TLatLng) => new Microsoft.Maps.Location(point.latitude, point.longitude))
        : getCircleLocs(refCenter, props.mapRef.current.objects.circleRadius, APP_CONFIG.MAPS.DEFAULTS.POLYGON_POINTS, true);

    // polygonPoints.pop(); // causing issues with the polygon
    // use the polygon points to create pushpins
    polygonPoints?.forEach((polygonPoint: any, index: number) => {
      const newPushpin = new Microsoft.Maps.Pushpin(
        polygonPoint,
        {
          anchor: new Microsoft.Maps.Point(16, 32),
          icon: MapMarkerRed,
          draggable: props.mapData.editable,
          ...(props.mapData.editable ? dragLabelPoints : {})
        }
      );
      props.mapRef.current.map.entities.push(newPushpin);

      // add event listener for dragend event on the edge pushpin
      Microsoft.Maps.Events.addHandler(
        newPushpin,
        'dragend',
        (args: any) => {
          // redraw the polygon
          const polygonPointLocations = props.mapRef.current.objects.mPushpins.pPoints.map((point: any) => point.getLocation());
          console.log('polygonPointLocations', polygonPointLocations)
          renderPolygon(props.mapRef, refCenter, polygonPointLocations, polygonColorRGB);
          // update the map data
          console.log('[setMapData] via mapOperations (radius dragend)');
          props.setMapData({
              ...props.mapData,
              centerPosition: {
                latitude: refCenter.latitude,
                longitude: refCenter.longitude
              },
              locs: polygonPointLocations.map((point: any) => ({ latitude: point.latitude, longitude: point.longitude } as TLatLng)),
            } as TGeozoneMapData
          );
        }
      );

      props.mapRef.current.objects.mPushpins.pPoints.push(newPushpin);
    });

    // render the polygon
    renderPolygon(props.mapRef, refCenter, polygonPoints, polygonColorRGB);
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

export const mapUpdatesHandler: TMapUpdatesHandler = (props, action, value) => {
  if(APP_CONFIG.DEBUG.MAPS) console.log('[mapUpdatesHandler]', action, value);

  const Microsoft = (window as any).Microsoft;
  const refCenter = props.mapRef.current.map.getCenter();

  switch(action) {
    case 'edit':
      // edge pushpins are draggable
      props.mapRef.current.objects.mPushpins?.pPoints?.forEach((pushpin: any) => {
        pushpin.setOptions({
          draggable: value,
          // ...(value ? dragLabelPoints : {})
        });
      });
      // show the infobox
      if(false) {
        props.mapRef.current.objects.mInfobox = new Microsoft.Maps.Infobox(refCenter, {
          title: i18n.t('admins.geozones.detailsPage.map.polygonEdit.heading'),
          description: i18n.t('admins.geozones.detailsPage.map.polygonEdit.sub_heading'),
          showPointer: false, 
          // showCloseButton: false,
          visible: false,
          actions: [{
              label: i18n.t('admins.geozones.detailsPage.map.polygonEdit.ok_button'),
              eventHandler: () => {
                // close info box
                props.mapRef.current.objects.mInfobox.setOptions({ visible: false });
              }
          }],
        });
        props.mapRef.current.objects.mInfobox.setMap(props.mapRef.current.map);
        props.mapRef.current.objects.mInfobox.setOptions({ visible: true });
        setTimeout(() => {
          const infoboxElement = (window as any).document.querySelector('.MicrosoftMap .Infobox')?.parentNode;
          if(infoboxElement) {
            (infoboxElement as any).style.transition = 'all 0.5s ease 0s';
            (infoboxElement as any).style.left = '20px';
            (infoboxElement as any).style.top = '20px';
          }
        }, 100);
      }
      break;
    default:
      break;
  }  
}