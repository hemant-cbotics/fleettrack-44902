export type OrganizationAccount = {
  id: number;
  created_at: string;
  updated_at: string;
  description: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  private_cost: number;
  idle_gas_usage: number;
  distance_gas_usage: number;
  auto_update_interval_for_maps: number;
  drivers_assigned_to_devices: boolean;
  enable_map_clustering: string;
  open_reports_in_new_tab: boolean;
  sync_driver_id_from_driver_admin: boolean;
  has_snowplows: boolean;
  hide_total_rows_in_csv: boolean;
  timezone: string | null;
  speed_units: string;
  distance_units: string;
  volume_units: string;
  economy_units: string;
  pressure_units: string;
  temperature_units: string;
  lat_lan_format: string;
  route_segment_color_rule: string | null;
  route_line_thickness: string;
  multi_vehicle_map_name: string | null;
  device_title: string | null;
  device_title_plural: string | null;
  device_group_title: string | null;
  device_group_title_plural: string | null;
  address_title: string | null;
  address_title_plural: string | null;
  default_login_user_id: string | null;
  default_overlay: string | null;
  maintenance_intervals: {
    last_maintenance_1: number;
    last_maintenance_2: number;
    last_maintenance_3: number;
    last_maintenance_4: number;
    last_maintenance_5: number;
    last_maintenance_6: number;
    last_maintenance_7: number;
    last_maintenance_8: number;
    last_maintenance_9: number;
    last_maintenance_10: number;
    last_service_time_1: number;
    last_service_time_2: number;
    last_service_time_3: number;
    last_service_time_4: number;
    last_service_time_5: number;
    last_eng_hours_maintenance_1: number;
    last_eng_hours_maintenance_2: number;
    last_eng_hours_maintenance_3: number;
    last_eng_hours_maintenance_4: number;
    last_eng_hours_maintenance_5: number;
  };
  harsh_braking: string | null;
  harsh_acceleration: string | null;
  speeding: string | null;
  reverse: string | null;
  seatbelt_off: string | null;
  harsh_cornering: string | null;
  idle_ratio: string | null;
  impact_crash_ai: string | null;
  cellphone_use_ai: string | null;
  distracted_driving_ai: string | null;
  drinking_eating_ai: string | null;
  smoking_ai: string | null;
  possible_fatigue_ai: string | null;
  obstructed_camera_ai: string | null;
  tailgating_ai: string | null;
};

export type LegacyOrganizationAccount = {
  accountid: string,
  accountmanager: null,
  accounttype: number,
  allowmaintlabels: 0 | 1,
  allownotify: 0 | 1,
  allowptolabels: 0 | 1,
  allowwebservice: 0 | 1,
  attributemask: number,
  autoadddevices: 0 | 1,
  clearfaultcodes: number,
  contactemail: string,
  contactname: string,
  contactphone: string,
  creationtime: number, // 1554818575,
  currencyunits: string,
  datapushurl: string,
  dcspropertiesid: string,
  defaultmaplayer: number,
  defaultoverlay: null,
  defaultsnappedroute: number,
  defaultuser: string,
  description: string,
  displayname: string,
  distanceunits: number,
  economyunits: number,
  elogaccountid: string,
  elogenabled: 0 | 1,
  elogpassword: string,
  elogproperties: string,
  elogusername: string,
  emailproperties: string,
  enableclustering: 0 | 1,
  enablecrashtrack: 0 | 1,
  enabledept: 0 | 1,
  enablemainthistory: 0 | 1,
  enablenewtabreporting: 0 | 1,
  expirationtime: number,
  fuelcostperliter: number,
  geocodermode: number, // need all possible values
  grouplabel1: string,
  grouplabel2: string,
  grouplabel3: string,
  grouplabel4: string,
  grouplabel5: string,
  grouplabel6: string,
  grouplabel7: string,
  grouplabel8: string,
  grouplabel9: string,
  grouplabel10: string,
  grouplabel11: string,
  grouplabel12: string,
  grouplabel13: string,
  grouplabel14: string,
  grouplabel15: string,
  grouplevel1: number,
  grouplevel2: number,
  grouplevel3: number,
  grouplevel4: number,
  grouplevel5: number,
  grouplevel6: number,
  grouplevel7: number,
  grouplevel8: number,
  grouplevel9: number,
  grouplevel10: number,
  grouplevel11: number,
  grouplevel12: number,
  grouplevel13: number,
  grouplevel14: number,
  grouplevel15: number,
  hasdriversassigned: 0 | 1,
  hassnowplows: 0 | 1,
  hidetotalsrowcsv: 0 | 1,
  highlightrailway: 0 | 1,
  idlegasusage: number,
  inclcameventsonscorecard: 0 | 1,
  isaccountmanager: 0 | 1,
  isactive: 0 | 1,
  isbordercrossing: 0 | 1,
  lastdatapushtime: number,
  lastdatarequesttime: number,
  lastlogintime: number,
  lastpasswords: string | null,
  lastupdatetime: number,
  latlonformat: number, // need all possible values
  maintlabelft0: string,
  maintlabelft1: string,
  maintlabelft2: string,
  maintlabelft3: string,
  maintlabelft4: string,
  maintlabelhr0: string,
  maintlabelhr1: string,
  maintlabelhr2: string,
  maintlabelhr3: string,
  maintlabelhr4: string,
  maintlabelkm0: string,
  maintlabelkm1: string,
  maintlabelkm2: string,
  maintlabelkm3: string,
  maintlabelkm4: string,
  maintlabelkm5: string,
  maintlabelkm6: string,
  maintlabelkm7: string,
  maintlabelkm8: string,
  maintlabelkm9: string,
  managerid: string,
  maplegenddevice: string,
  maplegendgroup: string,
  mapoverlay: string,
  mapupdatetimer: number,
  maximumdevices: number,
  maxpingcount: number,
  milesgasusage: number,
  minidleseconds: number,
  multivehiclemapname: string,
  notes: string,
  notifyemail: string,
  onetomanybilling: number, // should be 0 | 1 ?
  parentaccountid: null,
  passwdchangetime: number,
  passwdquerytime: number,
  preferdateformat: string,
  prefertimeformat: string,
  pressureunits: number,
  privategascost: number,
  privatelabelname: string, // "*",
  ptolabel0: string,
  ptolabel1: string,
  ptolabel2: string,
  ptolabel3: string,
  requestipaddress: string,
  requestpasscode: string,
  retainedeventage: number, // should be 0 | 1 ?
  routesegcolorsel: string,
  routestrokethickness: number,
  scorewtcornering: number,
  scorewtcorneringai: number,
  scorewtdistractedai: number,
  scorewtfatigueai: number,
  scorewtfooddrinkai: number,
  scorewtharshaccel: number,
  scorewtharshbrake: number,
  scorewtidle: number,
  scorewtimpactai: number,
  scorewtobjcameraai: number,
  scorewtphoneuseai: number,
  scorewtreverse: number,
  scorewtseatbeltoff: number,
  scorewtseatbeltoffai: number,
  scorewtsmokingai: number,
  scorewtspeeding: number,
  scorewttailgatingai: number,
  seatbeltoffspeedthreshold: null,
  showallgroupsonrpt: 0 | 1,
  showdtcpopups: 0 | 1,
  showspeedingbehavior: 0 | 1,
  smsenabled: 0 | 1,
  smsproperties: string,
  smtpproperties: null,
  speedunits: number,
  sungardip: string,
  suspenduntiltime: number,
  syncdriverid: 0 | 1,
  temperatureunits: number,
  temppassword: null,
  timezone: string, // "US/Eastern",
  tomcattimeout: number,
  totalpingcount: number,
  updatevinprops: number,
  usedrivergroups: 0 | 1,
  usedrivermanagers: 0 | 1,
  usedynamicstatuscodes: 0 | 1,
  usehamburgermenu: 0 | 1,
  usehierarchygroups: 0 | 1,
  usesso: 0 | 1,
  viewvideoallowed: 0 | 1,
  vistracksaccountid: null,
  volumeunits: number
}