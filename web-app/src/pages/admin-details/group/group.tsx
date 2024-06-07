/**
 * -----------------------------------------------------------------------------
 * Group Detail Page
 * -----------------------------------------------------------------------------
 * This page is used to show the details of a single group of the organization.
 */

import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setModalsData, TModalsState } from "../../../api/store/commonSlice";
import { AdminFormFieldCheckbox, AdminFormFieldDropdown, AdminFormFieldInput, AdminFormFieldSubmit } from "../../../components/admin/formFields";
import HeaderView from "../../../components/admin/headerView";
import AppSearchBox from "../../../components/searchBox";
import { APP_CONFIG } from "../../../constants/constants";
import { useLoggedInUserData } from "../../../utils/user";
import { useDeleteSingleGroupMutation, useEditOrganizationGroupMutation, useOrganizationGroupsQuery, useOrganizationVehiclesQuery, useSingleOrganizationGroupQuery } from "../../../api/network/adminApiServices";
import { OrganizationGroup } from "../../../api/types/Group";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import AdminsGroupsHeader from "./header";
import GroupVehicleItem from "./vehicleItem";
import { TGroupListItem, TListData } from "./type";
import AdminListingColumnItem from "../../../components/adminListingColumnItem";


const ScreenAdminDetailGroup = () => {
  const { groupId } = useParams<{ groupId: any }>();
  const { state: locationState } = useLocation(); // OrganizationEntityListingPayload | { new: true }
  const { t } = useTranslation('translation', { keyPrefix: 'admins.groups.detailsPage'});
  const { t: tMain } = useTranslation();
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // flag to idenfiy if group is coming from create new group popup
  const isNewEntity = useRef<boolean>(!!locationState?.new);

  // flag to enable edit mode
  const [userCanEdit, setUserCanEdit] = React.useState<boolean>(!!isNewEntity?.current);

  // current vehicle list mechainism
  const [currentAllVehicleList, setCurrentAllVehicleList] = React.useState<TGroupListItem[]>([]);
  const [currentGroupVehicleList, setCurrentGroupVehicleList] = React.useState<TGroupListItem[]>([]);

  // selected vehicles mechainism
  const [leftSelectedVehicles, setleftSelectedVehicles] = React.useState<any[]>([]);
  const [rightSelectedVehicles, setrightSelectedVehicles] = React.useState<any[]>([]);

  // search text for right side
  const [rightSearchText, setRightSearchText] = React.useState<string>("");

  // current description and group mechainism
  const [currentDescription, setCurrentDescription] = React.useState<string>("");
  const [currentGroupName, setCurrentGroupName] = React.useState<string>("");

  // show inactive vehicles mechainism
  const [showInactiveVehicles, setShowInactiveVehicles] = React.useState(false);

  // prepare query params for fetching organization groups
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId")
  const [orgGroupsQueryParams, setOrgGroupsQueryParams] = React.useState({
    organization_id: thisUserOrganizationId ?? 0,
    page: 1,
    page_size: APP_CONFIG.LISTINGS.LARGE_PAGE_SIZE,
    search: "",
    is_active: "both" as FilterType
  });

  // fetch organization groups
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

  // fetch single group details
  const { data: dataSingleGroup, isFetching: isFetchingSingleGroup } = useSingleOrganizationGroupQuery( { organization_id: thisUserOrganizationId, group_id: parseInt(groupId) }, { skip: !groupId });

  // group mutations
  const [ editOrganizationGroupApiTrigger , {isLoading: isLoadingEditGroup}] = useEditOrganizationGroupMutation();
  const [ deleteSingleGroupApiTrigger, {isLoading: isLoadingDeleteGroup}] = useDeleteSingleGroupMutation();

  // fetch organization vehicles
  const {data: dataOrgVehicles, isFetching: isFetchingOrgVehicles} = useOrganizationVehiclesQuery(orgGroupsQueryParams);
  const { results: allVehicles } = dataOrgVehicles ?? {};
  const { results } = dataOrgGroups ?? {};
  const { vehicles: groupVehicles } = dataSingleGroup ?? {};

  // prepare list data for group list
  const listData: OrganizationGroup[] = !!results ? results : [];

  // prepare all vehicle list
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

  // prepare group vehicle list
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

  // updating description and vehicle list on data change
  useEffect(() => {
    setCurrentGroupName(dataSingleGroup?.name ?? "");
    setCurrentDescription(dataSingleGroup?.description ?? "");
    setCurrentGroupVehicleList(groupVehicleList);
  }, [dataSingleGroup])
 
  // updating all vehicle list on data change
  useEffect(() => {
    setCurrentAllVehicleList(allVehicleList.filter((allVehicleItem) => !currentGroupVehicleList.some((groupVehicleItem) => allVehicleItem.id === groupVehicleItem.id)))
  }, [dataOrgVehicles, currentGroupVehicleList])

  // handle left checkbox selection
  const handleLeftCheckboxChange = ({ item, isChecked }: { item: any; isChecked: boolean }) => {
    if(isChecked) {
      setleftSelectedVehicles([...leftSelectedVehicles, item]);
    } else {
      setleftSelectedVehicles(leftSelectedVehicles.filter((group) => group.id !== item.id));
    }
  }

  // handle right checkbox selection
  const handleRightCheckboxChange = ({ item, isChecked }: { item: any; isChecked: boolean }) => {
    if(isChecked) {
      setrightSelectedVehicles([...rightSelectedVehicles, item]);
    } else {
      setrightSelectedVehicles(rightSelectedVehicles.filter((group) => group.id !== item.id));
    }
  }

  // handle add selected vehicles from all vehicles
  const handleAddSelected = () => {
    setCurrentGroupVehicleList([...currentGroupVehicleList, ...leftSelectedVehicles]);
    setCurrentAllVehicleList(currentAllVehicleList.filter((item) => !leftSelectedVehicles.some((group) => group.id === item.id)));
    setleftSelectedVehicles([]);
  }

  // handle remove selected vehicles from group vehicles
  const handleRemoveSelected = () => {
    setCurrentAllVehicleList([...currentAllVehicleList, ...rightSelectedVehicles]);
    setCurrentGroupVehicleList(currentGroupVehicleList.filter((item) => !rightSelectedVehicles.some((group) => group.id === item.id)));
    setrightSelectedVehicles([]);
  }

  // handle add all vehicles from all vehicles
  const handleAddAll = () => {
    setCurrentGroupVehicleList([...currentGroupVehicleList, ...currentAllVehicleList]);
    setCurrentAllVehicleList([]);
    setleftSelectedVehicles([]);
  }

  // handle remove all vehicles from group vehicles
  const handleRemoveAll = () => {
    setCurrentAllVehicleList([...currentAllVehicleList, ...currentGroupVehicleList]);
    setCurrentGroupVehicleList([]);
    setrightSelectedVehicles([]);
  }

  // handle search change for right side
  const handleRightSearchChange = (e: any) => {
    setRightSearchText(e.target.value);
  }

  //handle cancel button 
  const handleCancelButton = () => {
    setCurrentGroupVehicleList(groupVehicleList);
    setCurrentDescription(dataSingleGroup?.description ?? "");
    setUserCanEdit(false);
  }

  // handle edit group
  const handleEditGroup = () => {

    // prepare payload
    const data = {
      description: currentDescription,
      vehicle_ids: currentGroupVehicleList.map((vehicle) => vehicle.id).join(',')
    }

    // call api to update group
    editOrganizationGroupApiTrigger({organization_id: thisUserOrganizationId, group_id: parseInt(groupId), data: data})
      .unwrap()
      .then(() => {
        toast.success(t("toast.group_updated"));
        navigate(`${routeUrls.dashboardChildren.adminChildren.groups}`);
      })
      .catch((error) => {
        const errors = !!error?.data ? serializeErrorKeyValues(error?.data) : [t('toast.updation_failed')];
        toast.error(errors?.join(' '));
      });
  }

  // handle delete group
  const handleDeleteGroup = () => {
    deleteSingleGroupApiTrigger({organization_id: thisUserOrganizationId, group_id: parseInt(groupId)})
    .unwrap()
    .then(() => {
      setCurrentDescription("");
      toast.success(t("toast.group_deleted"));
      navigate(routeUrls.dashboardChildren.adminChildren.groups);
    })
    .catch((error:any) => {
      const errors = !!error?.data ? serializeErrorKeyValues(error?.data) : [t('toast.deletion_failed')];
      toast.error(errors?.join(' '));
    });
  }

  return (
    <>
      <HeaderView 
        title={t('heading')} 
        showBackButton={true}
        backButtonCallback={() =>
          navigate(routeUrls.dashboardChildren.adminChildren.groups)
        } />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="lg:grid lg:grid-cols-12 py-2 gap-4">
          <div className={`hidden xl:block lg:col-span-3 space-y-4${isFetchingOrgGroups ? ' opacity-40 pointer-events-none' : ''}${isNewEntity?.current ? ' xl:hidden' : ''} relative flex flex-col`}>
          <div className="font-bold text-lg leading-6 mt-2 mb-3">{t("listing_heading")}</div>
            <AppSearchBox
              placeholder={t("search_placeholder")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                debouncedSetSearchKeyword(e.target.value)
              }
            />
            <div className="absolute top-[100px] max-h-[calc(100vh-150px)] overflow-auto">
              {listData?.map((item, index: number) => (
                <AdminListingColumnItem
                  key={index}
                  selected={parseInt(groupId) === item.id}
                  onClick={() =>
                    navigate(
                      `${routeUrls.dashboardChildren.adminChildren.groups}/${item.id}`
                    )
                  }
                  title={`${item.name}`}
                  description={`${item.description}`}
                  asideText={``} // ${item.is_active ? tMain("admins.filters.active") : tMain("admins.filters.inactive")}`}
                  bottomText={item.vehicles.length === 1 ? t('vehicle_count_1') : t('vehicle_count', { count: item.vehicles.length})}
                />
              ))}
            </div>
          </div>
          <div className={`${isNewEntity?.current ? 'lg:col-span-12' : 'col-span-12 xl:col-span-9'} space-y-4`}>
            <div className="flex items-center gap-4">
                { isNewEntity?.current ? (
                  <>
                    <p className="font-bold text-lg leading-6">{currentGroupName}</p>
                    <div className="flex-grow"></div>
                    <p className="font-semibold text-blue-900 text-base leading-6">
                      {tMain("admins.completeCreation")}
                    </p>
                    {/* <div className="w-24">
                      <AdminFormFieldSubmit
                        type="submit"
                        variant="success"
                        label={tMain("save")}
                        onClick={handleEditFleettag}
                        disabled={isLoadingEditFleettag}
                      />
                    </div> */}
                  </>
                ) : (
                  <>
                    <p className="font-bold text-lg leading-6">{currentGroupName}</p>
                    <div className="flex-grow"></div>
                    <div className="w-24">
                      <AdminFormFieldSubmit
                        type="button"
                        variant="primary"
                        label={tMain("help")}
                        onClick={() => {}}
                        disabled={isLoadingEditGroup}
                      />
                    </div>
                    <div className="w-24">
                      <AdminFormFieldSubmit
                        type="button"
                        variant="primary"
                        label={tMain("edit")}
                        onClick={() => setUserCanEdit(!userCanEdit)}
                        disabled={userCanEdit || isLoadingEditGroup}
                      />
                    </div>
                    <div className="w-24">
                      <AdminFormFieldSubmit
                        type="button"
                        variant="danger"
                        label={tMain("delete")}
                        onClick={() => {dispatch(setModalsData({ ...modalsState, showDeleteConfirmation: true }))}}
                        disabled={isLoadingEditGroup}
                      />
                    </div>
                  </>
                )}
            </div>
            <div className="w-full">
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
                disabled={!userCanEdit}
              />
            </div>
            <div className="flex items-center py-3">
              <p className="font-semibold text-xl leading-10 text-accent-blue-dark">Vehicles</p>
              <div className="flex-grow"></div>
              <div className="w-1/2">
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
            <div className={`${isNewEntity?.current ? 'lg:col-span-12' : 'col-span-12 xl:col-span-9'} grid grid-cols-12 gap-4 ${(isLoadingEditGroup || isLoadingDeleteGroup || isFetchingOrgVehicles || isFetchingSingleGroup) ? "opacity-40" : "" }`}>

              {/* ---- LEFT SIDE ---- */}
              <div className="col-span-4">
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
                            disabled={!userCanEdit}
                          />
                        )
                      })}
                    </div>
                  </fieldset>
                </div>
              </div>

              {/* ---- BUTTONS ---- */}
              <div className="col-span-4 flex flex-col space-y-2">
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
                    disabled={!userCanEdit}
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
                    disabled={!userCanEdit}
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
                    disabled={!userCanEdit}
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
                    disabled={!userCanEdit}
                  />
                </div>
                <div className="flex-grow"></div>
                <AdminFormFieldSubmit
                  type="button"
                  variant="primary"
                  label={tMain("cancel")}
                  onClick={handleCancelButton}
                  disabled={!userCanEdit}
                />
                <AdminFormFieldSubmit
                  type="button"
                  variant="success"
                  label={tMain("save")}
                  onClick={handleEditGroup}
                  disabled={!userCanEdit}
                />
              </div>

              {/* ---- RIGHT SIDE ---- */}
              <div className="col-span-4">
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
                            disabled={!userCanEdit}
                          />
                        )
                      })}
                    </div>
                  </fieldset>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* <AdminsGroupsCreateNew /> */}
      <DeleteConfirmation handleDeleteAdmin={handleDeleteGroup} />
    </>
  );
}

export default ScreenAdminDetailGroup;