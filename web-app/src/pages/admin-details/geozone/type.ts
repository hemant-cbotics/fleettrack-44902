export type TListData = {
  id: number;
  zone_id: string;
  zone_type: string;
  description: string | null;
  radius: string | null;
}

export type TMapRef = {
  map: any;
  objects: any;
}