import React from "react";
import { APP_CONFIG } from "../../constants/constants";
import { TMapRef } from "../../pages/admin-details/geozone/type";
import { TLatLng } from "./types";

type TOnMapScriptLoadedProps = {
  mapRef: React.MutableRefObject<TMapRef>;
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
      mapTypeId: Microsoft.Maps.MapTypeId.road, // aerial, auto, birdseye, collinsBart, mercator, ordnanceSurvey, road, streetside
      navigationBarMode: Microsoft.Maps.NavigationBarMode.square, // 'square', 'default'
      center: new Microsoft.Maps.Location(
        props.currentPosition.latitude,
        props.currentPosition.longitude
      ),
      zoom: 14,
    }
  );
  props.setLoadingMap(false);
  props.onMapReadyCallback && props.onMapReadyCallback();
}