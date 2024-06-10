import { GeozoneType } from "../../../api/types/Geozone";
import { APP_CONFIG } from "../../../constants/constants";
import { ColorRGB } from "../../../types/common";
import { TGeozoneMapData, TGeozoneMapDataForAPIs, TLatLng, TMapState } from "../../../types/map";
import { getCircleLocs } from "../../../utils/map";

type TGeozonePrepareMapDataForAPIsProps = {
  shapeType: GeozoneType,
  seedMapData?: TGeozoneMapData,
  centerPosition?: TLatLng,
  polygonSides?: number | string,
  locs?: TLatLng[],
  radius?: number,
};
type TGeozonePrepareMapDataForAPIs = (props: TGeozonePrepareMapDataForAPIsProps) => TGeozoneMapDataForAPIs;

export const geozonePrepareMapDataForAPIs: TGeozonePrepareMapDataForAPIs =
  ({
    shapeType,
    seedMapData,
    centerPosition,
    polygonSides,
    locs,
    radius,
  }) => {
    const Microsoft = (window as any).Microsoft;
    let mapDataForAPIs = { ...seedMapData };
    delete mapDataForAPIs.color;
    delete mapDataForAPIs.editable;
    delete mapDataForAPIs.ready;

    // centerPosition
    if(seedMapData) {
      if(seedMapData.centerPosition) {
        mapDataForAPIs.centerPosition = {
          latitude: seedMapData.centerPosition.latitude,
          longitude: seedMapData.centerPosition.longitude,
        };
      }
      // prepare appropriate mapDataForAPIs based on shapeType
      switch(shapeType) {
        case 'Polygon':
        case 'Route':
          if(seedMapData.locs) {
            mapDataForAPIs.locs =
              locs ??
              seedMapData.locs.map(loc => ({
                latitude: loc.latitude,
                longitude: loc.longitude,
              }));
          }
          break;
        case 'Circle':
        default:
          if(seedMapData.radius) {
            mapDataForAPIs.radius = seedMapData.radius ?? APP_CONFIG.MAPS.DEFAULTS.RADIUS;
          }
          break;
      }
    } else {
      // prepare fresh mapDataForAPIs
      mapDataForAPIs.centerPosition = centerPosition ?? APP_CONFIG.MAPS.DEFAULTS.CENTER;
      switch(shapeType) {
        case 'Route':
          mapDataForAPIs.locs = [];
          break;
        case 'Polygon':
          mapDataForAPIs.locs =
            locs ??
            getCircleLocs(
              new Microsoft.Maps.Location(
                mapDataForAPIs.centerPosition.latitude,
                mapDataForAPIs.centerPosition.longitude
              ),
              APP_CONFIG.MAPS.DEFAULTS.RADIUS,
              parseInt(`${polygonSides}`) ?? APP_CONFIG.MAPS.DEFAULTS.POLYGON_POINTS,
              true
            ).map((loc: any) => ({
              latitude: loc.latitude,
              longitude: loc.longitude
            }));
          break;
        case 'Circle':
        default:
          mapDataForAPIs.radius = radius ?? APP_CONFIG.MAPS.DEFAULTS.RADIUS;
          break;
      }
    }
    console.log('x shapeType: ', shapeType);
    console.log('x seedMapData: ', seedMapData);
    console.log('x returning mapDataForAPIs: ', mapDataForAPIs);
    return mapDataForAPIs;
  };

type TGeozonePrepareMapStateProps = TGeozonePrepareMapDataForAPIsProps & {
  seedMapState: TMapState,
  color?: ColorRGB,
  editable?: boolean,
  ready?: boolean,
};
type TGeozonePrepareMapState = (props: TGeozonePrepareMapStateProps) => TMapState;

export const geozonePrepareMapState: TGeozonePrepareMapState =
  ({
    seedMapState,
    shapeType,
    seedMapData,
    centerPosition,
    polygonSides,
    locs,
    radius,
    color,
    editable,
    ready,
  }) => {
    console.log('. seedMapData', seedMapData);
    console.log('. locs', locs);
    const mapCenter = centerPosition ?? seedMapState.mapCenter;
    const mapDataForAPIs =
      geozonePrepareMapDataForAPIs({
        shapeType,
        seedMapData,
        centerPosition: mapCenter,
        polygonSides,
        locs,
        radius
      });
    return {
      ...seedMapState,
      mapCenter,
      mapData: {
        ...seedMapData,
        ...mapDataForAPIs,
        color: color ?? seedMapData?.color ?? APP_CONFIG.MAPS.DEFAULTS.ZONE_COLOR,
        editable: editable ?? seedMapState?.mapData?.editable,
        ready: ready ?? seedMapState.mapData?.ready ?? false,
      },
      mapDataForAPIs,
    };
  }