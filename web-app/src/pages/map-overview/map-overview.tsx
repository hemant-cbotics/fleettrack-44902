import { useTranslation } from "react-i18next";
import HeaderView from "./headerView";
import { APP_CONFIG } from "../../constants/constants";
import AppSearchBox from "../../components/searchBox";
import { useDebouncedCallback } from "use-debounce";
import { useNavigate, useParams } from "react-router-dom";
import { routeUrls } from "../../navigation/routeUrls";
import { TGroupList, TVehicleList } from "./type";
import DeviceIcon from "../../assets/svg/device-icon.svg";
import { useLoggedInUserData } from "../../utils/user";
import { useEffect, useState } from "react";
import { useOrganizationGroupsQuery } from "../../api/network/adminApiServices";
import { OrganizationGroup } from "../../api/types/Group";
import { AdminFormFieldDropdown } from "../../components/admin/formFields";
import { useDispatch, useSelector } from "react-redux";
import { TModalsState, setModalsData } from "../../api/store/commonSlice";
import MapFilter from "./mapFilter";
import DeviceReport from "./report";
import GroupList from "./groupList";
import { OrganizationVehicle } from "../../api/types/Vehicle";
import GroupSelectorModal from "./groupSelector";

const ScreenMapOverview = () => {
  const { deviceId } = useParams<{ deviceId: any }>();
  const { t } = useTranslation("translation", { keyPrefix: "mapOverview" });
  const [selectedGroups, setSelectedGroups] = useState<string>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalsState: TModalsState = useSelector(
    (state: any) => state.commonReducer.modals
  );
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");
  const [orgGroupsQueryParams, setOrgGroupsQueryParams] = useState({
    organization_id: thisUserOrganizationId ?? 0,
    page: 1,
    page_size: 100,
    search: "",
  });

  const { data: dataOrgGroups, isLoading: isFetchingOrgGroups } = useOrganizationGroupsQuery(
    orgGroupsQueryParams
  );

  const { results } = dataOrgGroups ?? {};
  const [filteredGroupData, setFilteredGroupData] = useState<TGroupList[]>([]);
  const groupData: TGroupList[] = !!results
    ? (results || ([] as OrganizationGroup[])).map(
      (item: OrganizationGroup, index: number) => ({
        id: item?.id,
        name: item?.name,
        listOfVehicles: item?.vehicles.map(
          (vehicle: OrganizationVehicle, index: number) => ({
            id: vehicle.id,
            name: vehicle?.vehicle_model + " " + vehicle?.vehicle_make || "-",
            description: vehicle?.vehicle_description || "-",
            vin: vehicle?.vin || "-",
            is_active: vehicle?.is_active,
          })
        ),
        checked: true,
      })
    )
    : [];

  useEffect(() => {
    setFilteredGroupData(groupData);
  }, [dataOrgGroups])

  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    console.log(value);
  }, 500);

  return (
    <>
      <HeaderView
        title={t("heading")}
        filterChange={() => {
          dispatch(setModalsData({ ...modalsState, showMapFilter: true }));
        }}
        groupSelectorCallback={() => {
          dispatch(setModalsData({ ...modalsState, showGroupSelector: true }));
        }}
      />
      <GroupSelectorModal filteredGroupData={filteredGroupData} setFilteredGroupData={setFilteredGroupData} />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="lg:grid lg:grid-cols-12 py-2">
          <div
            className={`hidden xl:block lg:col-span-3 space-y-4${
              isFetchingOrgGroups ? " opacity-40 pointer-events-none" : ""
              } bg-gray-100 rounded-l-lg`}
          >
            <div className="px-4 mt-4">
              <AppSearchBox
                placeholder={t("search_placeholder")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  debouncedSetSearchKeyword(e.target.value)
                }
              />
            </div>
            <div className="px-3 font-bold text-lg leading-6">
              {t("listing_heading")}
            </div>
            <div>
              {filteredGroupData?.filter((group) => group.checked)?.map((item: any, index: number) => (
                <GroupList
                  key={index}
                  name={item.name}
                  color="red"
                  noOfVehicles={item.listOfVehicles.length}
                  openByDefault={index === 0 ? true : false}
                >
                  {item.listOfVehicles
                    ?.map((vehicle: any, index: number) => (
                      <div
                        key={index}
                        className={`border-b px-3 py-2 border-gray-200 cursor-pointer ${
                          deviceId === vehicle.id ? "bg-blue-200" : ""
                          }`}
                        onClick={() => { dispatch(setModalsData({ ...modalsState, showDeviceReport: true })); }}>
                        <div className="grid grid-cols-4">
                          <div className="col-span-3 flex space-x-2">
                            <div className="flex items-center">
                              {/* <img src={DeviceIcon} alt={`device-img${vehicle.id}`} className="p-2 bg-gray-200 rounded-full"/> */}
                              <input
                                type="checkbox"
                                className="size-4 rounded border-gray-300 disabled:bg-gray-200 disabled:border-gray-300"
                                id={vehicle.id}
                                onChange={() => { }}
                              />
                            </div>
                            <div>
                              <p className="font-semibold text-sm leading-6 text-blue-900">
                                {vehicle.name}
                              </p>
                              <p className="font-normal text-xs leading-6 text-gray-500">
                                {vehicle.description}
                              </p>
                              <p className="font-normal text-base leading-6 text-gray-700">
                                {vehicle.vin}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-1 font-bold text-xs leading-4 text-right text-green-700 space-y-1">
                            {vehicle.is_active ? "Active" : "Inactive"}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </GroupList>
              ))}
            </div>
          </div>
          <div className="lg:col-span-9 relative">
            <DeviceReport />
          </div>
        </div>
      </div>
      <MapFilter />
    </>
  );
};

export default ScreenMapOverview;
