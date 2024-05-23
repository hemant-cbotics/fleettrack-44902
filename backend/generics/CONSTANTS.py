from django.utils.functional import classproperty
from django.utils.translation import ugettext_lazy as _

from enum import Enum, unique

class BaseEnum(Enum):
        @classmethod
        def choices(cls):
            choices = list()
            for item in cls:
                choices.append((item.value, _(item.descriptive_name)))
            return tuple(choices)

        # string the name
        def __str__(self):
            return self.name

        # int the value
        def __int__(self):
            return self.value

        @classproperty
        def valid_values(cls):
            choices = list()
            for item in cls:
                choices.append(item.value)
            return tuple(choices)

        @property
        def descriptive_name(self):
            return self.name.replace('_', ' ').title()

        @classproperty
        def choices_dict(cls):
            choices = {}
            for item in cls:
                choices[item.value] = _(item.descriptive_name)
            return choices
        
        def display_name(self):
            return self.name.capitalize()

class VehicleConstants:

    @unique
    class EquipmentStatus(BaseEnum):
        UNSPECIFIED = "Unspecified"
        IN_SERVICE = "In Service"
        RENTED = "Rented"
        PENDING = "Pending"
        COMPLETED = "Completed"
        AVAILABLE = "Available"
        UNAVAILABLE = "Unavailable"
        REPAIR = "Repair"
        RETIRED = "Retired"
        SPARE = "Spare"

    @unique
    class AssetType(BaseEnum):
        UNSPECIFIED = "Unspecified"
        AMBULANCE = "Ambulance"
        ARMORED_TRUCK = "Armored Truck"
        BOX_TRUCK = "Box Truck"
        BUCKET_TRUCK = "Bucket Truck"
        CABLE_PULLER = "Cable Puller"
        CAR = "Car"
        CAR_CARRIER = "Car Carrier"
        CLIP_TRUCK = "Clip Truck"
        CONTAINER = "Container"
        DUMP_TRUCK = "Dump Truck"
        ELECTRIC_VEHICLE = "Electric Vehicle"
        FIRE_ENGINE = "Fire Engine"
        FLATBED = "Flatbed"
        GANG_TRUCK = "Gang Truck"
        HEAVY_TRUCK = "Heavy Truck"
        LICGHT_TRUCK = "Light Truck"
        LINE_TRUCK = "Line Truck"
        MOBILE_WASH = "Mobile Wash"
        PICKUP_WITH_PLOW = "Pickup with Plow"
        PICK_UP = "Pick Up"
        RACK_TRUCK = "Rack Truck"
        RACK_WITH_BOOM = "Rack with Boom"
        RAILCAR = "Railcar"
        REEFER = "Reefer"
        ROAD_TRUCK = "Road Truck"
        RODDER_TRUCK = "Rodder Truck"
        ROLL_OFF = "Roll Off"
        SCISSOR_LIFT = "Scissor Lift"
        SEDAN = "Sedan"
        SEWER_TRUCK = "Sewer Truck"
        SNOW_FIGHTER = "Snow Fighter"
        SNOW_PLOW = "Snow Plow"
        STEP_VAN = "Step Van"
        SUV = "SUV"
        SUV_WITH_PLOW = "SUV with Plow"
        TANKER = "Tanker"
        TOW_BOAT = "Tow Boat"
        TOW_TRUCK = "Tow Truck"
        TRAILER = "Trailer"
        TRACTOR = "Tractor"
        TRUCK = "Truck"
        UTILITY_TRUCK = "Utility Truck"
        VAC_TRUCK = "Vac Truck"
        VAN = "Van"
        VEHICLE = "Vehicle"
        WELDING_TRUCK = "Welding Truck"
        OTHER = "Other"

    @unique
    class VehicleClass(BaseEnum):
        UNSPECIFIED = "Unspecified"
        C = "C"
        CDL_A = "CDL_A"
        CDL_B = "CDL_B"
        CDL_C = "CDL_C"
        D = "D"
        D_CONDITIONAL = "D_CONDITIONAL"
        D_RESTRICED = "D_RESTRICED"
        E = "E"
        G = "G"
        N_A = "N/A"
        PERMIT = "PERMIT"
        T = "T"
        V = "V"

    @unique
    class MapRouterColor(BaseEnum):
        DEFAULT = "Default"
        BLACK = "Black"
        BROWN = "Brown"
        RED = "Red"
        ORANGE = "Orange"
        GREEN = "Green"
        BLUE = "Blue"
        PURPLE = "Purple"
        GRAY = "Gray"
        CYAN = "Cyan"
        PINK = "Pink"
        NONE = "None"

    @unique
    class IgnitionInput(BaseEnum):
        N_A = "N/A"
        IGNITION_ON_OFF = "IgnitionOn/Off"
        START_STOP = "Start/Stop"
        ZERO = "0"
        ONE = "1"
        TWO = "2"
        THREE = "3"
        FOUR = "4"
        FIVE = "5"
        SIX = "6"
        SEVEN = "7"

    @unique
    class FuelType(BaseEnum):
        UNLEADED = "Unleaded"
        DIESEL = "Diesel"
        LEADED = "Leaded"
        ETHANOL = "Ethanol"
        METHANOL = "Methanol"
        BIODIESEL = "Biodiesel"
        KEROSENE = "Kerosene"
        LPG = "LPG"
        PROPANE = "Propane"
        BUTANE = "Butane"
        CNG = "CNG"
        METHANE = "Methane"
        HYDROGEN = "Hydrogen"
        HYBRID = "Hybrid"
        ELECTRIC = "Electric"
        OTHER = "Other"
        UNKNOWN = "Unknown"

    @unique
    class RecorderStatus(BaseEnum):
        UNKNOWN = "Unknown"
        YES = "Yes"
        NO = "No"

    @unique
    class RecorderType(BaseEnum):
        NONE = "None"
        SMARTWITNESS = "SmartWitness"
        SURFSIGHT = "Surfsight"





class DriverConstants:

    @unique
    class LicenceType(BaseEnum):
        C = "C"
        C_M = "C:M"
        CDL_A = "CDL_A"
        CDL_A_M = "CDL_A:M"
        CDL_B = "CDL_B"
        CDL_B_M = "CDL_B:M"
        CDL_C = "CDL_C"
        CDL_C_M = "CDL_C:M"
        D = "D"
        D_M = "D:M"
        D_CONDITIONAL = "D_CONDITIONAL"
        D_RESTRICTED = "D_RESTRICTED"
        E = "E"
        E_M = "E:M"
        NA = "NA"
        OUT_OF_STATE = "OUT OF STATE"
        PERMIT = "PERMIT"

    @unique
    class LicenceState(BaseEnum):
        AL = "AL"
        AK = "AK"
        AZ = "AZ"
        AR = "AR"
        CA = "CA"
        CO = "CO" 
        CT = "CT" 
        DE = "DE" 
        DC = "DC" 
        FL = "FL"  
        GA = "GA" 
        HI = "HI" 
        ID = "ID" 
        IL = "IL" 
        IN = "IN"
        IA = "IA"
        KS = "KS"
        KY = "KY"
        LA = "LA"
        ME = "ME"
        MD = "MD"
        MA = "MA"
        MI = "MI"
        MN = "MN"
        MS = "MS"
        MO = "MO"
        MT = "MT"
        NE = "NE"
        NV = "NV"
        NH = "NH"
        NJ = "NJ"
        NM = "NM"
        NY = "NY"
        NC = "NC"
        ND = "ND"
        OH = "OH"
        OK = "OK"
        OR = "OR"
        PA = "PA"
        RI = "RI"
        SC = "SC"
        SD = "SD"
        TN = "TN"
        TX = "TX"
        UT = "UT"
        VT = "VT"
        VA = "VA"
        WA = "WA"
        WV = "WV"
        WI = "WI"
        WY = "WY" 

    @unique
    class LicenceStatus(BaseEnum):
        VALID = "VALID"
        SUSPENDED = "SUSPENDED"
        SURRENDERED = "SURRENDERED"
        REVOKED = "REVOKED"
        RESTRICTED = "RESTRICTED"
        PERMITS_ONLY = "PERMITS ONLY"
        PENDING_SUSPENSION = "PENDING SUSPENSION"
        PENDING_EXPIRE = "PENDING EXPIRE"
        OUT_OF_STATE = "Out of State"
        INVALID_DATA = "INVALID DATA"
        ID_ONLY = "ID ONLY"
        EXPIRED = "EXPIRED"
        CONDITIONAL = "CONDITIONAL"


class UserConstants:

    @unique
    class TimeZones(BaseEnum):
        US_HAWAII = "US/Hawaii"
        US_ALASKA = "US/Alaska"
        US_PACIFIC = "US/Pacific"
        US_ARIZONA = "US/Arizona"
        US_MOUNTAIN = "US/Mountain"
        US_CENTERAL = "US/Central"
        US_EASTERN = "US/Eastern"
        CANADA_PACIFIC = "Canada/Pacific"
        CANADA_MOUNTAIN = "Canada/Mountain"
        CANADA_CENTERAL = "Canada/Central"
        CANADA_EASTERN = "Canada/Eastern"
        CANADA_ATLANTIC = "Canada/Atlantic"
        MEXICO_BAJA_NORTE = "Mexico/BajaNorte"
        MEXICO_BAJASUR = "Mexico/BajaSur"
        MEXICO_GENERAL = "Mexico/General"
        EUROPE_ATHENS = "Europe/Athens"
        EUROPE_BERLIN = "Europe/Berlin"
        EUROPE_DUBLIN = "Europe/Dublin"
        EUROPE_HELINSKI = "Europe/Helsinki"
        EUROPE_KEIV = "Europe/Kiev"
        EUROPE_LISBON = "Europe/Lisbon"
        EUROPE_LONDON = "Europe/London"
        EUROPE_MADRID = "Europe/Madrid"
        EUROPE_MOSCOW = "Europe/Moscow"
        EUROPE_OSLO = "Europe/Oslo"
        EUROPE_PARIS = "Europe/Paris"
        EUROPE_ROME = "Europe/Rome"
        EUROPE_STOCKHOLM = "Europe/Stockholm"
        EUROPE_ZURICH = "Europe/Zurich"
        PACIFIC_AUCKLAND = "Pacific/Auckland"
        PACIFIC_CHATHAM = "Pacific/Chatham"
        GMT = "GMT"
        GMT_00_00 = "GMT+00:00"
        GMT_01_00 = "GMT+01:00"
        GMT_02_00 = "GMT+02:00"
        GMT_03_00 = "GMT+03:00"
        GMT_04_00 = "GMT+04:00"
        GMT_05_00 = "GMT+05:00"
        GMT_06_00 = "GMT+06:00"
        GMT_07_00 = "GMT+07:00"
        GMT_08_00 = "GMT+08:00"
        GMT_09_00 = "GMT+09:00"
        GMT_10_00 = "GMT+10:00"
        GMT_11_00 = "GMT+11:00"
        GMT_12_00 = "GMT+12:00"
        GMT_13_00 = "GMT+13:00"
        GMT_14_00 = "GMT+14:00"
        GMT_N_01_00 = "GMT-01:00"
        GMT_N_02_00 = "GMT-02:00"
        GMT_N_03_00 = "GMT-03:00"
        GMT_N_04_00 = "GMT-04:00"
        GMT_N_05_00 = "GMT-05:00"
        GMT_N_06_00 = "GMT-06:00"
        GMT_N_07_00 = "GMT-07:00"
        GMT_N_08_00 = "GMT-08:00"
        GMT_N_09_00 = "GMT-09:00"
        GMT_N_10_00 = "GMT-10:00"
        GMT_N_11_00 = "GMT-11:00"
        GMT_N_12_00 = "GMT-12:00"


    @unique
    class DefaultOverlay(BaseEnum):
        UNSPECIFIED = "Unspecified"
        SOONERSALOONWHITE = "SoonerSaloonWhite"
        SOONERSALOONTRANSPARENT = "SoonerSaloonTransparent"
        VIRGINIA = "Virginia"
        CLEVELANDPOLICEDISTRICT_1 = "ClevelandPoliceDistrict1"
        CLEVELANDPOLICEDISTRICT_2 = "ClevelandPoliceDistrict2"
        CLEVELANDPOLICEDISTRICT_3 = "ClevelandPoliceDistrict3"
        CLEVELANDPOLICEDISTRICT_4 = "ClevelandPoliceDistrict4"
        CLEVELANDPOLICEDISTRICT_5 = "ClevelandPoliceDistrict5"
        CLEVELANDWARD_1 = "ClevelandWard1"
        CLEVELANDWARD_2 = "ClevelandWard2"
        CLEVELANDWARD_3 = "ClevelandWard3"
        CLEVELANDWARD_4 = "ClevelandWard4"
        CLEVELANDWARD_5 = "ClevelandWard5"
        CLEVELANDWARD_6 = "ClevelandWard6"
        CLEVELANDWARD_7 = "ClevelandWard7"
        CLEVELANDWARD_8 = "ClevelandWard8"
        CLEVELANDWARD_9 = "ClevelandWard9"
        CLEVELANDWARD_10 = "ClevelandWard10"
        CLEVELANDWARD_11 = "ClevelandWard11"
        CLEVELANDWARD_12 = "ClevelandWard12"
        CLEVELANDWARD_13 = "ClevelandWard13"
        CLEVELANDWARD_14 = "ClevelandWard14"
        CLEVELANDWARD_15 = "ClevelandWard15"
        CLEVELANDWARD_16 = "ClevelandWard16"
        CLEVELANDWARD_17 = "ClevelandWard17"
        CLEVELANDWARD_18 = "ClevelandWard18"
        CLEVELANDWARD_19 = "ClevelandWard19"

    @unique
    class UserState(BaseEnum):
        LOCKED = "Locked"
        UNLOCKED = "Unlocked"

    @unique
    class FirstLoginPage(BaseEnum):
        MAIN_MENU = "Main Menu"
        DEVICE_MAP = "Device Map"
        DASHBOARD = "Dashboard"
        FLEET_MAP = "Fleet Map"
        DETAIL_REPORTS = "Detail Reports"
        FLEET_REPORTS = "Fleet Reports"

    @unique
    class MapClustering(BaseEnum):
        OFF = "Off"
        ON = "On"
        ALWAYS = "Always show all pushpins"

    @unique
    class SpeedUnits(BaseEnum):
        MPH = "Mph"
        KMH = "Km/h"
        KNOTS = "Knots"

    @unique
    class DistanceUnits(BaseEnum):
        MILES = "Miles"
        KM = "Km"
        NAUTICAL_MILES = "Nautical Miles"

    @unique
    class VolumeUnits(BaseEnum):
        GALLONS = "Gallons"
        LITERS = "Liters"
        IMPERIAL_GALLONS = "Imperial Gallons"
        FT_3 = "Ft^3"

    @unique
    class EconomyUnits(BaseEnum):
        MPG = "Mpg"
        KML = "Km/l"
        KPG = "Kpg"
        L_100KM = "L/100km"

    @unique
    class PressureUnits(BaseEnum):
        KPA = "kPa"
        PSI = "psi"
        MMHG = "mmHg"
        BAR = "bar"

    @unique
    class TemperatureUnits(BaseEnum):
        CELSIUS = "Celsius"
        FAHRENHEIT = "Fahrenheit"

    @unique
    class LatLonFormat(BaseEnum):
        DEGREES = "Degrees"
        DEG_MIN_SEC = "Deg:Min:Sec"
        DEG_MIN = "Deg:Min"


    @unique
    class RouteLineThickness(BaseEnum):
        ONE = "1 (Thinnest)"
        TWO = "2 (Default)"
        THREE = "3"
        FOUR = "4"
        FIVE = "5"
        SIX = "6"
        SEVEN = "7"
        EIGHT = "8 (Widest)"

    class UserAccountJSON():
        MAINTENANCE_INTERVAL_TIMINGS = {
            "last_maintenance_1": 0,
            "last_maintenance_2": 0,
            "last_maintenance_3": 0,
            "last_maintenance_4": 0,
            "last_maintenance_5": 0,
            "last_maintenance_6": 0,
            "last_maintenance_7": 0,
            "last_maintenance_8": 0,
            "last_maintenance_9": 0,
            "last_maintenance_10": 0,
            "last_eng_hours_maintenance_1": 0,
            "last_eng_hours_maintenance_2": 0,
            "last_eng_hours_maintenance_3": 0,
            "last_eng_hours_maintenance_4": 0,
            "last_eng_hours_maintenance_5": 0,
            "last_service_time_1": 0,
            "last_service_time_2": 0,
            "last_service_time_3": 0,
            "last_service_time_4": 0,
            "last_service_time_5": 0
        }

    @unique
    class ZeroToNineInteger(BaseEnum):
        Zero = 0
        One = 1
        Two = 2
        Three = 3
        Four = 4
        Five = 5
        Six = 6
        Seven = 7
        Eight = 8
        Nine = 9