// --------------------------------
// Bing autosuggest response types
// --------------------------------

export type BingLocationAddress = {
  addressLine?: string;
  adminDistrict: string;
  adminDistrict2?: string;
  countryRegion: string;
  countryRegionIso2?: string;
  formattedAddress: string;
  houseNumber?: string;
  locality?: string;
  postalCode?: string;
  streetName?: string;
}

export type BingAutosuggestResItem = {
  __type: 'LocalBusiness' | 'Place' | 'Address';
  name?: string;
  address: BingLocationAddress;
}


// --------------------------------
// Bing geocode response types
// --------------------------------

type BingGeocodePoint = {
  type: string; // Point
  coordinates: number[]; // [longitude, latitude]
}

export type BingGeocodeResItem = {
  address: BingLocationAddress;
  bbox: number[];
  confidence: string; // High, Medium, Low
  entityType: string; // Address, Neighborhood, PopulatedPlace, Postcode1, Postcode2, Postcode3, AdminDivision1, AdminDivision2, CountryRegion
  geocodePoints: BingGeocodePoint[];
  matchCodes: string[]; // Good, Ambiguous, UpHierarchy
  name: string;
  point: BingGeocodePoint;
}


// --------------------------------
// Generic Bing response list types
// --------------------------------

type Resource<T> = {
  __type: string;
  value: T; // BingAutosuggestResItem[];
}

type ResourceSet<T> = {
  estimatedTotal: number;
  resources: T; // Resource<T>[]; // Resource[];
}

type BingGenericResponseList = {
  authenticationResultCode: "ValidCredentials";
  brandLogoUri: string;
  copyright: string;
  statusCode: number;
  statusDescription: string,
  traceId: string;
}


// --------------------------------
// Bing API response types
// --------------------------------

export type BingAutosuggestResponse = BingGenericResponseList & {
  resourceSets: ResourceSet<Resource<BingAutosuggestResItem[]>[]>[];
}

export type BingGeocodeResponse = BingGenericResponseList & {
  resourceSets: ResourceSet<BingGeocodeResItem[]>[];
}