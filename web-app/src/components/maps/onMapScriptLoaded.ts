import React from "react";
import { APP_CONFIG } from "../../constants/constants";
import { TMapRef } from "../../pages/admin-details/geozone/type";
import { TLatLng, TMapLayerOptions, TMapState, TMapType } from "../../types/map";

type TOnMapScriptLoadedProps = {
  mapRef: React.MutableRefObject<TMapRef>;
  mapStateToSetToLastViewOnLoad: TMapState | null; // set to last view if user is on map overview page - prevent momentary flicker to default location
  mapType: TMapType;
  mapLayerOptions: TMapLayerOptions;
  currentPosition: TLatLng;
  setLoadingMap: React.Dispatch<React.SetStateAction<boolean>>;
  onMapReadyCallback?: () => void;
}

export const onMapScriptLoaded = (props: TOnMapScriptLoadedProps) => {

  const Microsoft = (window as any).Microsoft;
  
  // render the map
  props.mapRef.current.map = new Microsoft.Maps.Map(
    document.getElementById(APP_CONFIG.MAPS.COMPONENT_ID),
    {
      mapTypeId: Microsoft.Maps.MapTypeId[props?.mapType ?? 'road'], // aerial, auto, birdseye, collinsBart, mercator, ordnanceSurvey, road, streetside
      navigationBarMode: Microsoft.Maps.NavigationBarMode.square, // 'square', 'default'
      disableScrollWheelZoom: true,
      center: new Microsoft.Maps.Location(
        props?.mapStateToSetToLastViewOnLoad?.mapCenter?.latitude ?? props.currentPosition.latitude,
        props?.mapStateToSetToLastViewOnLoad?.mapCenter?.longitude ?? props.currentPosition.longitude
      ),
      zoom: props?.mapStateToSetToLastViewOnLoad?.mapZoom ?? 14,
      showLocateMeButton: false,
      // showZoomButtons: false,
      // showDashboard: false,
      // showScalebar: false,
      // showBreadcrumb: false,
      // showTrafficButton: false,
    }
  );

  // set map layer options
  if(props.mapLayerOptions.traffic) {
    Microsoft.Maps.loadModule('Microsoft.Maps.Traffic', () => {
      var manager = new Microsoft.Maps.Traffic.TrafficManager(props.mapRef.current.map);
      manager.show();
    });
  }

  props.setLoadingMap(false);
  props.onMapReadyCallback && props.onMapReadyCallback();
}