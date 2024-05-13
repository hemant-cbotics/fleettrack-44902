import HeaderView from "../../../components/admin/headerView";
import SearchIcon from "../../../assets/svg/search-icon.svg";
import { FC } from "react";
import Accordian from "../../../components/accordian";
import { VehicleDetailForm, VehicleGroupMembershipForm } from "./vehicle-form";
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "../../../constants/constants";

const data = [
  {
    vehicle_id: "1010101010",
    description: "10022 Cheery Covalt",
    vin: "2G1WB5EK5A1196138",
    equipment_type: "Car Compact",
  },
  {
    vehicle_id: "1010101010",
    description: "10022 Cheery Covalt",
    vin: "2G1WB5EK5A1196138",
    equipment_type: "Car Compact",
  },
  {
    vehicle_id: "1010101010",
    description: "10022 Cheery Covalt",
    vin: "2G1WB5EK5A1196138",
    equipment_type: "Car Compact",
  },
  {
    vehicle_id: "1010101010",
    description: "10022 Cheery Covalt",
    vin: "2G1WB5EK5A1196138",
    equipment_type: "Car Compact",
  },
  {
    vehicle_id: "1010101010",
    description: "10022 Cheery Covalt",
    vin: "2G1WB5EK5A1196138",
    equipment_type: "Car Compact",
  },
];

interface ActionButtonProps {
  text: string;
}

const ActionButton: FC<ActionButtonProps> = ({ text }) => {
  return (
    <button className="rounded-full bg-blue-200 px-6 py-2">
      <p className="font-medium text-lg leading-6 text-blue-900">{text}</p>
    </button>
  );
};

const ScreenAdminDetailVehicle = () => {
  const { t: tmain } = useTranslation();
  const { t } = useTranslation("translation", {
    keyPrefix: "adminDetailScreen",
  });

  return (
    <>
      <HeaderView title={t("user_specific_view")} />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex items-center">
          <p className="font-semibold text-blue-900 text-lg leading-6">
            {t("create_user_description")}
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-12 mt-8 py-2">
          <div className="lg:col-span-3 space-y-4">
            <div className="font-bold text-lg leading-6">{t("users")}</div>
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t("search_user_here")}
                className="w-full p-2 pl-10 rounded-md border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <img
                src={SearchIcon}
                alt="search-icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
              />
            </div>
            {data.map((item, index) => (
              <div key={index} className="border-b px-3 py-2 border-gray-200">
                <div className="grid grid-cols-4">
                  <div className="col-span-3">
                    <p className="font-semibold text-sm leading-6 text-blue-900">
                      {item.vehicle_id}
                    </p>
                    <p className="font-normal text-xs leading-6 text-gray-500">
                      {item.description}
                    </p>
                  </div>
                  <div className="col-span-1 font-bold text-xs leading-4 text-right">
                    {item.equipment_type}
                  </div>
                </div>
                <p className="font-normal text-base leading-6 text-gray-700">
                  {item.vin}
                </p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-9 px-4">
            <div className="flex justify-end space-x-4">
              <ActionButton text={tmain("edit")} />
              <ActionButton text={tmain("sms")} />
              <ActionButton text={tmain("command")} />
            </div>
            <div className="rounded-lg mt-2 bg-blue-200">
              <Accordian title={t("details")}>
                <VehicleDetailForm vehicle={""} onSubmit={() => {}} />
              </Accordian>
              <Accordian title={t("camera_id")}>
                <p>Hiii</p>
              </Accordian>
              <Accordian title={t("maintainance_intervals")}>
                <p>Hiii</p>
              </Accordian>
              <Accordian title={t("group_membership")}>
                <VehicleGroupMembershipForm groups={""} onSubmit={() => {}} />
              </Accordian>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenAdminDetailVehicle;
