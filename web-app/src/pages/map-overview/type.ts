
export type TVehicleList = {
  id: string;
  name: string;
  description: string;
  vin: string;
  is_active: boolean;
}

export type TGroupList = {
  id: number;
  name: string;
  listOfVehicles: TVehicleList[];
  checked?: boolean;
}
