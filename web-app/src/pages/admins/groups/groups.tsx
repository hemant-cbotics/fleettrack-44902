import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setModalsData, TModalsState } from "../../../api/store/commonSlice";
import { AdminFormFieldCheckbox, AdminFormFieldDropdown, AdminFormFieldInput, AdminFormFieldSubmit } from "../../../components/admin/formFields";
import HeaderView from "../../../components/admin/headerView";
import AppSearchBox from "../../../components/searchBox";
import { APP_CONFIG } from "../../../constants/constants";
import AdminsGroupsCreateNew from "./createNewGroup";
import AdminsGroupsHeader from "./header";
import GroupVehicleItem from "./vehicleItem";
import { useLoggedInUserData } from "../../../utils/user";
import { useDeleteSingleGroupMutation, useEditOrganizationGroupMutation, useOrganizationGroupsQuery, useOrganizationVehiclesQuery, useSingleOrganizationGroupQuery } from "../../../api/network/adminApiServices";
import { OrganizationGroup } from "../../../api/types/Group";
import { useNavigate, useParams } from "react-router-dom";
import { routeUrls } from "../../../navigation/routeUrls";
import { toast } from "react-toastify";
import { OrganizationVehicle } from "../../../api/types/Vehicle";

const tempGroupData = [
  { value: "1", label: "Group 1" },
  { value: "2", label: "Group 2" },
  { value: "3", label: "Group 3" },
  { value: "4", label: "Group 4" },
  { value: "5", label: "Group 5" }
]

const ScreenDashboardAdminGroups = () => {
  const { groupId } = useParams<{ groupId: any }>();
  const { t } = useTranslation('translation', { keyPrefix: 'admins.groups'});
  const { t: tMain } = useTranslation();
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentAllVehicleList, setCurrentAllVehicleList] = React.useState<any[]>([]);
  const [currentGroupVehicleList, setCurrentGroupVehicleList] = React.useState<any[]>([]);

  const [leftSelectedVehicles, setleftSelectedVehicles] = React.useState<any[]>([]);
  const [rightSelectedVehicles, setrightSelectedVehicles] = React.useState<any[]>([]);

  const [currentDescription, setCurrentDescription] = React.useState<string>("");

  const [showInactiveGroups, setShowInactiveGroups] = React.useState(false);
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId")
  const [orgGroupsQueryParams, setOrgGroupsQueryParams] = React.useState({
    organization_id: thisUserOrganizationId ?? 0,
    page: 1,
    page_size: APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
    search: ""
  });

  const {
    data: dataOrgGroups,
    isFetching: isFetchingOrgGroups,
    error
  } =
    useOrganizationGroupsQuery(orgGroupsQueryParams);

  const { data: dataSingleGroup, isFetching: isFetchingSingleGroup } = useSingleOrganizationGroupQuery( { organization_id: thisUserOrganizationId, group_id: parseInt(groupId) }, { skip: !groupId });
  const [ editOrganizationGroupApiTrigger , {isLoading: isLoadingEditGroup}] = useEditOrganizationGroupMutation();
  const [ deleteSingleGroupApiTrigger, {isLoading: isLoadingDeleteGroup}] = useDeleteSingleGroupMutation();

  const {data: dataOrgVehicles, isFetching: isFetchingOrgVehicles} = useOrganizationVehiclesQuery(orgGroupsQueryParams);
  const { results: allVehicles } = dataOrgVehicles ?? {};
  const { results } = dataOrgGroups ?? {};
  const { vehicles: groupVehicles } = dataSingleGroup ?? {};

  const groupData = !!results
  ? (results || ([] as OrganizationGroup[])).map(
      (item: OrganizationGroup, index: number) => ({
        value: item?.id.toString(),
        label: item?.name,
      })
    )
  : [];

  const allVehicleList = !!allVehicles
  ? (allVehicles || ([] as OrganizationVehicle[])).map(
      (item: OrganizationVehicle, index: number) => ({
        id: item?.id,
        name: item?.vehicle_model + " " + item?.vehicle_make,
      })
    )
  : [];

  const groupVehicleList  = !!groupVehicles
  ? (groupVehicles || ([] as OrganizationVehicle[])).map(
      (item: OrganizationVehicle, index: number) => ({
        id: item?.id,
        name: item?.vehicle_model + " " + item?.vehicle_make,
      })
    )
  : [];

  useEffect(() => {
    setCurrentDescription(dataSingleGroup?.description ?? "");
    setCurrentGroupVehicleList(groupVehicleList);
    setCurrentAllVehicleList(allVehicleList.filter((allVehicleItem) => !groupVehicleList.some((groupVehicleItem) => allVehicleItem.id === groupVehicleItem.id)))
  }, [dataSingleGroup, dataOrgVehicles])

  const handleLeftCheckboxChange = ({ item, isChecked }: { item: any; isChecked: boolean }) => {
    if(isChecked) {
      setleftSelectedVehicles([...leftSelectedVehicles, item]);
    } else {
      setleftSelectedVehicles(leftSelectedVehicles.filter((group) => group.id !== item.id));
    }
  }

  const handleRightCheckboxChange = ({ item, isChecked }: { item: any; isChecked: boolean }) => {
    if(isChecked) {
      setrightSelectedVehicles([...rightSelectedVehicles, item]);
    } else {
      setrightSelectedVehicles(rightSelectedVehicles.filter((group) => group.id !== item.id));
    }
  }

  const handleAddSelected = () => {
    setCurrentGroupVehicleList([...currentGroupVehicleList, ...leftSelectedVehicles]);
    setCurrentAllVehicleList(currentAllVehicleList.filter((item) => !leftSelectedVehicles.some((group) => group.id === item.id)));
    setleftSelectedVehicles([]);
  }

  const handleRemoveSelected = () => {
    setCurrentAllVehicleList([...currentAllVehicleList, ...rightSelectedVehicles]);
    setCurrentGroupVehicleList(currentGroupVehicleList.filter((item) => !rightSelectedVehicles.some((group) => group.id === item.id)));
    setrightSelectedVehicles([]);
  }

  const handleAddAll = () => {
    setCurrentGroupVehicleList([...currentGroupVehicleList, ...currentAllVehicleList]);
    setCurrentAllVehicleList([]);
    setleftSelectedVehicles([]);
  }

  const handleRemoveAll = () => {
    setCurrentAllVehicleList([...currentAllVehicleList, ...currentGroupVehicleList]);
    setCurrentGroupVehicleList([]);
    setrightSelectedVehicles([]);
  }

  const handleEditGroup = () => {
    const data = {
      description: currentDescription,
      vehicle_ids: currentGroupVehicleList.map((vehicle) => vehicle.id).join(',')
    }
    editOrganizationGroupApiTrigger({organization_id: thisUserOrganizationId, group_id: parseInt(groupId), data: data})
      .unwrap()
      .then(() => {
        toast.success(t("toast.group_updated"));
        navigate(`${routeUrls.dashboardChildren.adminChildren.groups}/${groupId}`);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  const handleDeleteGroup = () => {
    deleteSingleGroupApiTrigger({organization_id: thisUserOrganizationId, group_id: parseInt(groupId)})
    .unwrap()
    .then(() => {
      toast.success(t("toast.group_deleted"));
      navigate(routeUrls.dashboardChildren.adminChildren.groups);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  }


  return (
    <>
      <HeaderView title={t('heading')} showRefreshButton={false} />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} pt-4 flex flex-col gap-6 pb-8`}>
        <AdminsGroupsHeader
          heading={t("sub_heading")}
          ButtonElements={
            <>
            </>
          }
          addNewButtonCallback={() => {
            dispatch(setModalsData({ ...modalsState, showCreateGroup: true }))
          }}
          deleteButtonCallback={handleDeleteGroup}
          disabled={isLoadingDeleteGroup || isLoadingEditGroup || isFetchingSingleGroup}
        />
        <div className={`grid grid-cols-12 gap-4 items-end ${isFetchingOrgGroups ? 'opacity-40 pointer-events-none': ""}`}>
          <div className="col-span-4">
            <AdminFormFieldDropdown
              label={t("group")}
              id="GroupSelector"
              name="group"
              value={groupId.toString()}
              options={groupData}
              onChange={(e) => { navigate(`${routeUrls.dashboardChildren.adminChildren.groups}/${e?.value}`) }}
              // onBlur={(e) => { formikSetTouched("timezone", true); handleBlur(e); }}
            />
          </div>
          <div className="col-span-4"></div>
          <div className="col-span-4">
            <AdminFormFieldCheckbox
              label={t("show_inactive_groups")}
              id="ShowInactiveGroups"
              type="checkbox"
              name="show_inactive_groups"
              checked={showInactiveGroups}
              onChange={(e) => { setShowInactiveGroups(e.target.checked); }}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-12">
            <AdminFormFieldInput
              label={t("group_description")}
              type="text"
              id="GroupDescription"
              name="group_description"
              placeholder={t("group_description_placeholder")}
              value={currentDescription}
              onChange={(e) => { setCurrentDescription(e.target.value) }}
              // onBlur={handleBlur}
              // touched={touched.user_id}
              // error={errors.user_id}
            />
          </div>
        </div>
        <div className={`grid grid-cols-12 gap-4 ${(isLoadingEditGroup || isLoadingDeleteGroup || isFetchingOrgVehicles || isFetchingSingleGroup) ? "opacity-40" : "" }`}>

          {/* ---- LEFT SIDE ---- */}
          <div className="col-span-5">
            <label
              className={`block mb-2 text-sm font-display font-semibold text-field-label-valid`}
            >
              {t("not_in_selected_group")}
            </label>
            <AppSearchBox
              placeholder={t("search_placeholder")}
              onChange={handleAllVehicleSearchChange}
            />
            <div className="h-96 mt-4 p-2 border border-gray-500 rounded-lg overflow-y-auto">
              <fieldset>
                <legend className="sr-only">Checkboxes</legend>
                <div className="space-y-2">
                  {currentAllVehicleList?.map((grpItem) => {
                    return (
                      <GroupVehicleItem
                        key={grpItem.id}
                        id={grpItem.id}
                        title={grpItem.name}
                        handleChange={(e) => {handleLeftCheckboxChange({item: grpItem, isChecked: e.target.checked})}}
                      />
                    )
                  })}
                </div>
              </fieldset>
            </div>
          </div>

          {/* ---- BUTTONS ---- */}
          <div className="col-span-2 flex flex-col space-y-2">
            <div className="hidden lg:block h-20"></div>
            <AdminFormFieldSubmit
              type="button"
              variant="primary-like"
              label={t("add_all")}
              onClick={handleAddAll}
            />
            <AdminFormFieldSubmit
              type="button"
              variant="secondary"
              label={t("add_selected")}
              onClick={handleAddSelected}
            />
            <AdminFormFieldSubmit
              type="button"
              variant="secondary"
              label={t("remove_selected")}
              onClick={handleRemoveSelected}
            />
            <AdminFormFieldSubmit
              type="button"
              variant="primary-like"
              label={t("remove_all")}
              onClick={handleRemoveAll}
            />
            <div className="flex-grow"></div>
            <AdminFormFieldSubmit
              type="button"
              variant="success"
              label={tMain("save")}
              onClick={handleEditGroup}
              disabled={currentGroupVehicleList.length === 0}
            />
          </div>

          {/* ---- RIGHT SIDE ---- */}
          <div className="col-span-5">
            <label
              className={`flex gap-2 mb-2 text-sm font-display font-semibold text-field-label-valid`}
            >
              {t("in_selected_group")}
              <span className="flex-grow"></span>
              <span className="text-sm text-accent-green">{t("active", { count: 2 })}</span>
              <span className="text-sm text-field-error-border">{t("inactive", { count: 0 })}</span>
            </label>
            <AppSearchBox
              placeholder={t("search_placeholder")}
              onChange={() => {}}
            />
            <div className="h-96 mt-4 p-2 border border-gray-500 rounded-lg overflow-y-auto">
              <fieldset>
                <legend className="sr-only">Checkboxes</legend>
                <div className="space-y-2">
                  {currentGroupVehicleList.map((grpItem) => {
                    return (
                      <GroupVehicleItem
                        key={grpItem.id}
                        id={grpItem.id}
                        title={grpItem.name}
                        handleChange={(e) => {handleRightCheckboxChange({item: grpItem, isChecked: e.target.checked})}}
                      />
                    )
                  })}
                </div>
              </fieldset>
            </div>
          </div>

        </div>
      </div>
      <AdminsGroupsCreateNew />
    </>
  );
}
export default ScreenDashboardAdminGroups;