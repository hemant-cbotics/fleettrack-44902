import { TLatLng } from "../types/map";
import { APP_CONFIG } from "../constants/constants";
import { removeScript } from "./common";

type TMapGetCurrentPositionCallback = (position: TLatLng) => void;

export const mapGetCurrentPosition = (callback: TMapGetCurrentPositionCallback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      if(APP_CONFIG.DEBUG.MAPS) console.log('[mapGetCurrentPosition] Retrieved user current geo position', `${position.coords.latitude}, ${position.coords.longitude}`)
      callback({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

export const removeBingMap = () => {
  if(APP_CONFIG.DEBUG.MAPS) console.log('removeBingMap')
  removeScript(APP_CONFIG.MAPS.SCRIPT_ID)
}

// -------------------------------------
// Bing Maps operations for map entites
// -------------------------------------

// get the distance between two locations
export const getDistanceFromCenter = (loc1: any, loc2: any) => {
  const Microsoft = (window as any).Microsoft;
  if(APP_CONFIG.DEBUG.MAPS) console.log('[getDistanceFromCenter]', loc1.getLocation().latitude, loc2.getLocation().longitude);
  return Microsoft.Maps.SpatialMath.getDistanceTo(
    loc1.getLocation(),
    loc2.getLocation(),
    Microsoft.Maps.SpatialMath.DistanceUnits.Miles
  );
}

// calculate the locations for a regular polygon that has 36 locations which will result in an approximate circle.
export const getCircleLocs = (center: any, radius: any, edges: number, isPolygon: boolean = false) => {
  const Microsoft = (window as any).Microsoft;
  let locs = Microsoft.Maps.SpatialMath.getRegularPolygon(center, radius, edges, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
  return isPolygon ? locs.slice(0, locs.length - 1) : locs;
}

// Create a contour line that represents a circle.
export function createCircle(center: any, radius: any, color: any) {
  const Microsoft = (window as any).Microsoft;
  return new Microsoft.Maps.ContourLine(getCircleLocs(center, radius, 36 * 2), color);
}

export const renderCircle = (mapRef: any, center: any, radiusInMiles: number, colorRGB: [number,number,number]) => {
  const Microsoft = (window as any).Microsoft;
  if(APP_CONFIG.DEBUG.MAPS) console.log('Rendering circle at', center.latitude, center.longitude, 'with radius', radiusInMiles);
  mapRef.current.map.layers.clear();
  if(APP_CONFIG.DEBUG.MAPS) console.log('color', `rgba(${colorRGB.join(',')},0.2)`)
  mapRef.current.objects.mCircle = createCircle(center, radiusInMiles, `rgba(${colorRGB.join(',')},0.2)`);
  const circleLayer = new Microsoft.Maps.ContourLayer(
    [mapRef.current.objects.mCircle],
    {
      colorCallback: (val: any) => val,
      polygonOptions: {
        strokeThickness: 2,
        strokeColor: `rgba(${colorRGB.join(',')},0.6)`, // 'rgba(0,100,0,0.5)',
        visible: true
      }
    }
  );
  mapRef.current.map.layers.insert(circleLayer);

  // center the map to the circle
  mapRef.current.map.setView({
    bounds: Microsoft.Maps.LocationRect.fromLocations(getCircleLocs(center, radiusInMiles, 36 * 2)),
    padding: 20
  });
}

export const renderPolygon = (mapRef: any, center: any, polygonPoints: any, colorRGB: [number,number,number]) => {
  const Microsoft = (window as any).Microsoft;
  if(APP_CONFIG.DEBUG.MAPS) console.log('Rendering polygon at', center.latitude, center.longitude, 'with points', polygonPoints);
  mapRef.current.map.layers.clear();
  if(APP_CONFIG.DEBUG.MAPS) console.log('color', `rgba(${colorRGB.join(',')},0.2)`)
  mapRef.current.objects.mPolygon = new Microsoft.Maps.ContourLine(polygonPoints, `rgba(${colorRGB.join(',')},0.2)`); // createCircle(center, radiusInMiles, `rgba(${colorRGB.join(',')},0.2)`);
  const poygonLayer = new Microsoft.Maps.ContourLayer(
    [mapRef.current.objects.mPolygon],
    {
      colorCallback: (val: any) => val,
      polygonOptions: {
        strokeThickness: 2,
        strokeColor: `rgba(${colorRGB.join(',')},0.6)`, // 'rgba(0,100,0,0.5)',
        visible: true
      }
    }
  );
  mapRef.current.map.layers.insert(poygonLayer);

  // center the map to the polygon
  mapRef.current.map.setView({
    bounds: Microsoft.Maps.LocationRect.fromLocations(polygonPoints),
    padding: 20
  });
}

export const renderRoute = (mapRef: any, center: any, routePoints: any, colorRGB: [number,number,number]) => {
  if(!routePoints || routePoints.length < 2) return;
  const Microsoft = (window as any).Microsoft;
  if(APP_CONFIG.DEBUG.MAPS) console.log('Rendering route at', center.latitude, center.longitude, 'with points', routePoints);

  // remove existing routes
  if(mapRef.current.objects.mRoutes) mapRef.current.objects.mRoutes.forEach((route: any) => mapRef.current.map.entities.remove(route));

  if(APP_CONFIG.DEBUG.MAPS) console.log('color', `rgba(${colorRGB.join(',')},0.2)`)
  const line = new Microsoft.Maps.Polyline(
    routePoints, 
    { strokeColor: `rgba(${colorRGB.join(',')},0.6)`, 
      strokeThickness: 2 
    }
  );
  mapRef.current.map.entities.push(line);
  mapRef.current.objects.mRoutes.push(line);

  // center the map to the route
  mapRef.current.map.setView({
    bounds: Microsoft.Maps.LocationRect.fromLocations(routePoints),
    padding: 20
  });
}

export const customClisteredPinCallback = (cluster: any) => {
  const Microsoft = (window as any).Microsoft;

  //Define variables for minimum cluster radius, and how wide the outline area of the circle should be.
  var minRadius = 12;
  var outlineWidth = 7;

    //Get the number of pushpins in the cluster
  var clusterSize = cluster.containedPushpins.length;

    //Calculate the radius of the cluster based on the number of pushpins in the cluster, using a logarithmic scale.
  var radius = Math.log(clusterSize) / Math.log(10) * 5 + minRadius;

    //Default cluster color is red.
  var fillColor = 'rgba(255, 40, 40, 0.5)';

  if (clusterSize < 10) {
      //Make the cluster green if there are less than 10 pushpins in it.
      fillColor = 'rgba(20, 180, 20, 0.5)';            
  } else if (clusterSize < 100) {
      //Make the cluster yellow if there are 10 to 99 pushpins in it.
      fillColor = 'rgba(255, 210, 40, 0.5)';
  }

  //Create an SVG string of two circles, one on top of the other, with the specified radius and color.
  var svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="', (radius * 2), '" height="', (radius * 2), '">',
        '<circle cx="', radius, '" cy="', radius, '" r="', radius, '" fill="', fillColor, '"/>',
        '<circle cx="', radius, '" cy="', radius, '" r="', radius - outlineWidth, '" fill="', fillColor, '"/>',
        '</svg>'];

  //Customize the clustered pushpin using the generated SVG and anchor on its center.
  cluster.setOptions({
      icon: svg.join(''),
      anchor: new Microsoft.Maps.Point(radius, radius),
      textOffset: new Microsoft.Maps.Point(0, radius - 8) //Subtract 8 to compensate for height of text.
  });
}

