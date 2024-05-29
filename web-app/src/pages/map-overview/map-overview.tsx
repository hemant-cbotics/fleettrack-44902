import { useTranslation } from "react-i18next";
import HeaderView from "./headerView";
import { APP_CONFIG } from "../../constants/constants";
import AppSearchBox from "../../components/searchBox";
import { useDebouncedCallback } from "use-debounce";
import { useNavigate, useParams } from "react-router-dom";
import { routeUrls } from "../../navigation/routeUrls";
import { TListData } from "./type";
import DeviceIcon from "../../assets/svg/device-icon.svg";
import { useLoggedInUserData } from "../../utils/user";
import { useState } from "react";
import { useOrganizationGroupsQuery } from "../../api/network/adminApiServices";
import { OrganizationGroup } from "../../api/types/Group";
import { AdminFormFieldDropdown } from "../../components/admin/formFields";
import { useDispatch, useSelector } from "react-redux";
import { TModalsState, setModalsData } from "../../api/store/commonSlice";
import MapFilter from "./mapFilter";

const listData: TListData[] = [
  {
    id: 1,
    name: "John Doe",
    device_id: "123456",
    device_number: "123456",
    is_active: true,
    group_name: "Group 1",
    device_image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Jane Doe",
    device_id: "123456",
    device_number: "123456",
    is_active: true,
    group_name: "Test2",
    device_image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "John Doe",
    device_id: "123456",
    device_number: "123456",
    is_active: true,
    group_name: "Test1",
    device_image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Jane Doe",
    device_id: "123456",
    device_number: "123456",
    is_active: true,
    group_name: "Test",
    device_image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "John Doe",
    device_id: "123456",
    device_number: "123456",
    is_active: true,
    group_name: "Test",
    device_image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "Jane Doe",
    device_id: "123456",
    device_number: "123456",
    is_active: true,
    group_name: "Group 1",
    device_image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    name: "John Doe",
    device_id: "123456",
    device_number: "123456",
    is_active: true,
    group_name: "Test2",
    device_image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    name: "Jane Doe",
    device_id: "123456",
    device_number: "123456",
    is_active: true,
    group_name: "Test",
    device_image: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    name: "John Doe",
    device_id: "123456",
    device_number: "123456",
    is_active: true,
    group_name: "Test1",
    device_image: "https://via.placeholder.com/150",
  },
  {
    id: 10,
    name: "Jane Doe",
    device_id: "123456",
    device_number: "123456",
    is_active: true,
    group_name: "Test",
    device_image: "https://via.placeholder.com/150",
  },
  {
    id: 11,
    name: "John Doe",
    device_id: "123456",
    device_number: "123456",
    is_active: true,
    group_name: "Test1",
    device_image: "https://via.placeholder.com/150",
  },
  {
    id: 12,
    name: "Jane Doe",
    device_id: "123456",
    device_number: "123456",
    is_active: true,
    group_name: "Test2",
    device_image: "https://via.placeholder.com/150",
  },
];

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
  const groupData = !!results
    ? (results || ([] as OrganizationGroup[])).map(
        (item: OrganizationGroup, index: number) => ({
          value: item?.id.toString(),
          label: item?.name,
        })
      )
    : [];

  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    console.log(value);
  }, 500);

  const isFetchingMapOverview = false;
  return (
    <>
      <HeaderView
        title={t("heading")}
        filterChange={() => {
          dispatch(setModalsData({ ...modalsState, showMapFilter: true }));
        }}
      />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="lg:grid lg:grid-cols-12 mt-4 py-2">
          <div
            className={`hidden xl:block lg:col-span-3 space-y-4${
              isFetchingMapOverview ? " opacity-40 pointer-events-none" : ""
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
            <div className="flex justify-between items-center px-3">
              <div className="font-bold text-lg leading-6">
                {t("listing_heading")}
              </div>
              <div className="font-normal text-sm leading-6 text-blue-900 cursor-pointer">
                <AdminFormFieldDropdown
                  loadingData={isFetchingOrgGroups}
                  label={""}
                  id="group_id"
                  name="group_id"
                  options={groupData}
                  value={groupData[0]?.value}
                  onChange={(e) => {
                    setSelectedGroups(e?.label);
                  }}
                  customSelectboxClass="border-none"
                />
              </div>
            </div>
            <div>
              {listData
                ?.filter((listItem) => listItem.group_name === selectedGroups)
                ?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={`border-b px-3 py-2 border-gray-200 cursor-pointer ${
                      parseInt(deviceId) === item.id ? "bg-blue-200" : ""
                    }`}
                    onClick={() =>
                      navigate(
                        `${routeUrls.dashboardChildren.map_overview}/${item.id}`
                      )
                    }
                  >
                    <div className="grid grid-cols-4">
                      <div className="col-span-3 flex space-x-2">
                        <div className="flex items-center">
                          <img src={DeviceIcon} alt={`device-img${item.id}`} className="p-2 bg-gray-200 rounded-full"/>
                        </div>
                        <div>
                          <p className="font-semibold text-sm leading-6 text-blue-900">
                            {item.name}
                          </p>
                          <p className="font-normal text-xs leading-6 text-gray-500">
                            {item.device_id}
                          </p>
                          <p className="font-normal text-base leading-6 text-gray-700">
                            {item.device_number}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-1 font-bold text-xs leading-4 text-right space-y-1">
                        <div className="flex items-center justify-end space-x-1">
                          <p>{item.group_name}</p>
                          <div className="p-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <p className="text-green-700">
                          {item.is_active ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="lg:col-span-9">

          </div>
        </div>
      </div>
      <MapFilter />
    </>
  );
};

export default ScreenMapOverview;
