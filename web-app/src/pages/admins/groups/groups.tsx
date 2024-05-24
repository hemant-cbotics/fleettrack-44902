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
import FastForwardIcon from "../../../assets/svg/fast-forward-icon.svg";
import ForwardIcon from "../../../assets/svg/forward-icon.svg";
import FastBackwardIcon from "../../../assets/svg/fast-backward-icon.svg";
import BackwardIcon from "../../../assets/svg/backward-icon.svg";
import DeleteConfirmation from "../../../components/admin/deleteConfirmation";
import { FilterType } from "../../../api/types/Admin";
import { serializeErrorKeyValues } from "../../../api/network/errorCodes";
import { useDebouncedCallback } from "use-debounce";


const ScreenDashboardAdminGroups = () => {
  const { groupId } = useParams<{ groupId: any }>();
  const { t } = useTranslation('translation', { keyPrefix: 'admins.groups'});
  const { t: tMain } = useTranslation();
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  type TGroupListItem = {
    id: string;
    name: string;
    sub_title: string;
    is_active: boolean;
  }
  const [currentAllVehicleList, setCurrentAllVehicleList] = React.useState<TGroupListItem[]>([]);
  const [currentGroupVehicleList, setCurrentGroupVehicleList] = React.useState<TGroupListItem[]>([]);

  const [leftSelectedVehicles, setleftSelectedVehicles] = React.useState<any[]>([]);
  const [rightSelectedVehicles, setrightSelectedVehicles] = React.useState<any[]>([]);

  const [rightSearchText, setRightSearchText] = React.useState<string>("");

  const [currentDescription, setCurrentDescription] = React.useState<string>("");

  const [showInactiveVehicles, setShowInactiveVehicles] = React.useState(false);
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId")
  const [orgGroupsQueryParams, setOrgGroupsQueryParams] = React.useState({
    organization_id: thisUserOrganizationId ?? 0,
    page: 1,
    page_size: APP_CONFIG.LISTINGS.LARGE_PAGE_SIZE,
    search: "",
    is_active: "both" as FilterType
  });

  const {
    data: dataOrgGroups,
    isFetching: isFetchingOrgGroups,
    error
  } =
    useOrganizationGroupsQuery(orgGroupsQueryParams);

  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    setOrgGroupsQueryParams((prev) => {
      return { ...prev, page: 1, search: value };
    });
  }, 500);

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

  const allVehicleList: TGroupListItem[] = !!allVehicles
  ? (allVehicles || ([] as OrganizationVehicle[])).map(
      (item: OrganizationVehicle, index: number) => ({
        id: item?.id,
        name: `${item?.vehicle_model} ${item?.vehicle_make}`,
        sub_title: item?.unique_id ?? '',
        is_active: item?.is_active
      })
    )
  : [];

  const groupVehicleList: TGroupListItem[] = !!groupVehicles
  ? (groupVehicles || ([] as OrganizationVehicle[])).map(
      (item: OrganizationVehicle, index: number) => ({
        id: item?.id,
        name: `${item?.vehicle_model} ${item?.vehicle_make}`,
        sub_title: item?.unique_id ?? '',
        is_active: item?.is_active
      })
    )
  : [];

  useEffect(() => {
    setCurrentDescription(dataSingleGroup?.description ?? "");
    setCurrentGroupVehicleList(groupVehicleList);
  }, [dataSingleGroup])
 
  useEffect(() => {
    setCurrentAllVehicleList(allVehicleList.filter((allVehicleItem) => !currentGroupVehicleList.some((groupVehicleItem) => allVehicleItem.id === groupVehicleItem.id)))
  }, [dataOrgVehicles])

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

  const handleRightSearchChange = (e: any) => {
    setRightSearchText(e.target.value);
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
        const errors = !!error?.data ? serializeErrorKeyValues(error?.data) : [t('toast.updation_failed')];
        toast.error(errors?.join(' '));
      });
  }

  const handleDeleteGroup = () => {
    deleteSingleGroupApiTrigger({organization_id: thisUserOrganizationId, group_id: parseInt(groupId)})
    .unwrap()
    .then(() => {
      setCurrentDescription("");
      toast.success(t("toast.group_deleted"));
      navigate(routeUrls.dashboardChildren.adminChildren.groups);
    })
    .catch((error) => {
      const errors = !!error?.data ? serializeErrorKeyValues(error?.data) : [t('toast.deletion_failed')];
      toast.error(errors?.join(' '));
    });
  }

  useEffect(() => {
    if(!groupId && !!groupData && groupData.length > 0)  {
      window.location.href = `${routeUrls.dashboardChildren.adminChildren.groups}/${groupData?.[0]?.value}`;
    }
  }, [groupId, groupData])

  return (
    <>
      <HeaderView title={t('heading')} />
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
          deleteButtonCallback={() => {dispatch(setModalsData({ ...modalsState, showDeleteConfirmation: true }))}}
          disabled={isLoadingDeleteGroup || isLoadingEditGroup || isFetchingSingleGroup || !groupId}
        />
        <div className={`grid grid-cols-12 gap-4 items-end ${isFetchingOrgGroups ? 'opacity-40 pointer-events-none': ""}`}>
          <div className="col-span-4">
            <AdminFormFieldDropdown
              loadingData={!(!!dataOrgGroups && !!groupId)}
              label={t("group")}
              id="GroupSelector"
              name="group"
              value={`${groupId}`}
              options={groupData}
              onChange={(e) => { navigate(`${routeUrls.dashboardChildren.adminChildren.groups}/${e?.value}`) }}
              // onBlur={(e) => { formikSetTouched("timezone", true); handleBlur(e); }}
            />
          </div>
          <div className="col-span-4"></div>
          <div className="col-span-4">
            <AdminFormFieldCheckbox
              label={t("show_inactive_vehicles")}
              id="ShowInactiveVehicles"
              type="checkbox"
              name="show_inactive_vehicles"
              checked={showInactiveVehicles}
              onChange={(e) => { setShowInactiveVehicles(e.target.checked); }}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                debouncedSetSearchKeyword(e.target.value)
              }
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
                        sub_title={grpItem.sub_title}
                        handleChange={(e) => {handleLeftCheckboxChange({item: grpItem, isChecked: e.target.checked})}}
                        show={showInactiveVehicles ? true : grpItem.is_active}
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
            <div className="relative">
              <AdminFormFieldSubmit
                type="button"
                variant="primary-like"
                label={
                  <>
                    <span className="hidden xl:block mr-2">{t("add_all")}</span>
                    <img
                      src={FastForwardIcon}
                      alt="fast-forward-icon"
                      className="size-5"
                    />
                  </>}
                titleText={t("add_all")}
                onClick={handleAddAll}
              />
            </div>
            <div className="relative">
              <AdminFormFieldSubmit
                type="button"
                variant="secondary"
                label={
                  <>
                    <span className="hidden xl:block mr-2">{t("add_selected")}</span>
                    <img
                      src={ForwardIcon}
                      alt="fast-forward-icon"
                      className="size-5"
                    />
                  </>}
                titleText={t("add_selected")}
                onClick={handleAddSelected}
              />
            </div>
            <div className="relative">
              <AdminFormFieldSubmit
                type="button"
                variant="secondary"
                label={
                  <>
                    <img
                      src={BackwardIcon}
                      alt="fast-forward-icon"
                      className="size-5"
                    />
                    <span className="hidden xl:block ml-2">{t("remove_selected")}</span>
                  </>}
                titleText={t("remove_selected")}
                onClick={handleRemoveSelected}
              />
            </div>
            <div className="relative">
              <AdminFormFieldSubmit
                type="button"
                variant="primary-like"
                label={
                  <>
                    <img
                      src={FastBackwardIcon}
                      alt="fast-forward-icon"
                      className="size-5"
                    />
                    <span className="hidden xl:block ml-2">{t("remove_all")}</span>
                  </>}
                titleText={t("remove_all")}
                onClick={handleRemoveAll}
              />
            </div>
            <div className="flex-grow"></div>
            <AdminFormFieldSubmit
              type="button"
              variant="success"
              label={tMain("save")}
              onClick={handleEditGroup}
              disabled={!groupId}
            />
          </div>

          {/* ---- RIGHT SIDE ---- */}
          <div className="col-span-5">
            <label
              className={`flex gap-2 mb-2 text-sm font-display font-semibold text-field-label-valid`}
            >
              {t("in_selected_group")}
              <span className="flex-grow"></span>
              {currentGroupVehicleList?.filter((groupItem) => groupItem.name.toLowerCase().includes(rightSearchText.toLowerCase())).length > 0 && <>
                <span className="text-sm text-accent-green">{t("active", { count: currentGroupVehicleList?.filter((groupItem) => groupItem.name.toLowerCase().includes(rightSearchText.toLowerCase()) && groupItem.is_active).length })}</span>
                <span className="text-sm text-field-error-border">{t("inactive", { count: currentGroupVehicleList?.filter((groupItem) => groupItem.name.toLowerCase().includes(rightSearchText.toLowerCase()) && !groupItem.is_active).length })}</span>
              </>}
            </label>
            <AppSearchBox
              placeholder={t("search_placeholder")}
              onChange={handleRightSearchChange}
            />
            <div className="h-96 mt-4 p-2 border border-gray-500 rounded-lg overflow-y-auto">
              <fieldset>
                <legend className="sr-only">Checkboxes</legend>
                <div className="space-y-2">
                  {currentGroupVehicleList?.filter((groupItem) => groupItem.name.toLowerCase().includes(rightSearchText.toLowerCase()))?.map((grpItem) => {
                    return (
                      <GroupVehicleItem
                        key={grpItem.id}
                        id={grpItem.id}
                        title={grpItem.name}
                        sub_title={grpItem.sub_title}
                        handleChange={(e) => {handleRightCheckboxChange({item: grpItem, isChecked: e.target.checked})}}
                        show={showInactiveVehicles ? true : grpItem.is_active}
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
      <DeleteConfirmation handleDeleteAdmin={handleDeleteGroup} />
    </>
  );
}
export default ScreenDashboardAdminGroups;