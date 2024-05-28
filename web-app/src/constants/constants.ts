export const APP_CONFIG = {
  APP_NAME: "FleetTrack",
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
  },
  MAPS: {
    SCRIPT_ID: 'bing-maps-script',
    SCRIPT_URL: (key: string) => `https://www.bing.com/api/maps/mapcontrol?key=${key}`, // callback=initMap&setLang=en&setMkt=en-US
  },
}