import HeaderView from "../../../components/admin/headerView";
import { FC } from "react";
import Accordian from "../../../components/accordian";
import { VehicleDetailForm, VehicleGroupMembershipForm } from "./vehicle-form";
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "../../../constants/constants";
import AppSearchBox from "../../../components/searchBox";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "../../../navigation/routeUrls";

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
  const { t: tMain } = useTranslation();
  const { t: tAdmin } = useTranslation("translation", { keyPrefix: "admins.vehicles" });
  const { t } = useTranslation("translation", { keyPrefix: "admins.vehicles.detailsPage" });
  const navigate = useNavigate();

  return (
    <>
      <HeaderView title={t("heading")} showBackButton={true} backButtonCallback={() => navigate(routeUrls.dashboardChildren.adminChildren.users)} />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex items-center">
          <p className="font-semibold text-blue-900 text-lg leading-6">
            {t("sub_heading")}
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-12 mt-8 py-2">
          <div className="lg:col-span-3 space-y-4">
            <div className="font-bold text-lg leading-6">{t("listing_heading")}</div>
            <AppSearchBox
              placeholder={tAdmin('search_placeholder')}
              onChange={() => {}}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearchKeyword(e.target.value)}
            />
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
              <ActionButton text={tMain("edit")} />
              <ActionButton text={tMain("sms")} />
              <ActionButton text={tMain("command")} />
            </div>
            <div className="rounded-lg mt-2 bg-blue-200">
              <Accordian title={t("accord_details")}>
                <VehicleDetailForm vehicle={""} onSubmit={() => {}} />
              </Accordian>
              <Accordian title={t("accord_camera_id")}>
                <p>Hiii</p>
              </Accordian>
              <Accordian title={t("accord_maintainance_intervals")}>
                <p>Hiii</p>
              </Accordian>
              <Accordian title={t("accord_group_membership")}>
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
