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
  },
  LISTINGS: {
    PAGE_SIZES: [10, 20, 50, 100],
    DEFAULT_PAGE_SIZE: 10,
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
  }
}