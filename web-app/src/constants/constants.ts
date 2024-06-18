import { ColorRGB } from "../types/common";

export const APP_CONFIG = {
  APP_NAME: "FleetTrack",
  COLORS: { // should stay consistent with tailwind.config.js
    GREEN: '#009007',
    RED: '#D0021B',
  },
  PASSWORD: {
    MIN_LENGTH: 8,
  },
  REGEX: {
    ALPHANUMERIC: /^[a-zA-Z0-9 ]*$/,
    VIN: /^[A-HJ-NPR-Z0-9]{17}$/,
    NUMERIC: /^[0-9]*$/,
    YEAR: /^[0-9]{4}$/,
    LICENSE_PLATE: /^[a-zA-Z0-9 ]*$/,
    PHONE_NUMBER: /^[0-9]{10}$/,
  },
  LISTINGS: {
    PAGE_SIZES: [10, 20, 50, 100],
    DEFAULT_PAGE_SIZE: 10,
    DROPDOWN_SEARCH_PAGE_SIZE: 20,
    LARGE_PAGE_SIZE: 100, // for groups
  },
  TOASTS: {
    INFO: false,
  },
  DES: { // design
    DASH: {
      P_HORIZ: 'px-6',
    }
  },
  DEBUG: {
    ALL: true,
    MAPS: false,
    GEOZONES: false,
  },
  MAPS: {
    SCRIPT_ID: 'bing-maps-script',
    SCRIPT_URL: (key: string) => `https://www.bing.com/api/maps/mapcontrol?key=${key}`, // callback=initMap&setLang=en&setMkt=en-US
    COMPONENT_ID: 'FTBingMap',
    DEFAULTS: {
      CENTER: { // Memphis, TN (LB Technology HQ)
        latitude: 35.129186,
        longitude: -89.9571074,
      },
      RADIUS: 0.6,
      POLYGON_POINTS_RANGE: [3, 12],
      POLYGON_POINTS: 6,
      ZONE_COLOR: [0, 150, 100] as ColorRGB,
    },
    COLORS: {
      Default: [0, 150, 100] as ColorRGB,
      Black: [0, 0, 0] as ColorRGB,
      Brown: [139, 69, 19] as ColorRGB,
      Red: [200, 0, 0] as ColorRGB,
      Orange: [200, 100, 0] as ColorRGB,
      Yellow: [200, 200, 0] as ColorRGB,
      Green: [0, 200, 0] as ColorRGB,
      Blue: [0, 0, 200] as ColorRGB,
      Purple: [100, 0, 200] as ColorRGB,
      Gray: [100, 100, 100] as ColorRGB,
      White: [255, 255, 255] as ColorRGB,
      Cyan: [0, 200, 200] as ColorRGB,
      Pink: [200, 0, 200] as ColorRGB,
    },
    VEHICLE_ICON_SIZE: 28,
    SHOW_INFOBOX_PUSHPIN_THRESHOLD: 6,
    INFOBOX_ZINDEX: 100,
    CONTROL_BUTTONS_ZINDEX: 200, // set explicitly to 200 in `index.scss`
  },
}