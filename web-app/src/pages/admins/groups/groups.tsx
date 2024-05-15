import React from "react";
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

const tempGroupData = [
  { value: "1", label: "Group 1" },
  { value: "2", label: "Group 2" },
  { value: "3", label: "Group 3" },
  { value: "4", label: "Group 4" },
  { value: "5", label: "Group 5" }
]

const ScreenDashboardAdminGroups = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'admins.groups'});
  const { t: tMain } = useTranslation();
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();

  const [showInactiveGroups, setShowInactiveGroups] = React.useState(false);

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
        />
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-4">
            <AdminFormFieldDropdown
              label={t("group")}
              id="GroupSelector"
              name="group"
              value={tempGroupData[0].value}
              options={tempGroupData}
              // onChange={(e) => { formikSetValue("timezone", e?.value); }}
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
              // value={values.user_id}
              // onChange={handleChange}
              // onBlur={handleBlur}
              // touched={touched.user_id}
              // error={errors.user_id}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">

          {/* ---- LEFT SIDE ---- */}
          <div className="col-span-5">
            <label
              className={`block mb-2 text-sm font-display font-semibold text-field-label-valid`}
            >
              {t("not_in_selected_group")}
            </label>
            <AppSearchBox
              placeholder={t("search_placeholder")}
              onChange={() => {}}
            />
            <div className="h-96 mt-4 p-2 border border-gray-500 rounded-lg overflow-y-auto">
              <fieldset>
                <legend className="sr-only">Checkboxes</legend>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((grpItem, i) => {
                    return (
                      <GroupVehicleItem
                        key={i}
                        id={grpItem}
                        title={`Vehicle #${grpItem}`}
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
              onClick={() => {}}
            />
            <AdminFormFieldSubmit
              type="button"
              variant="secondary"
              label={t("add_selected")}
              onClick={() => {}}
            />
            <AdminFormFieldSubmit
              type="button"
              variant="secondary"
              label={t("remove_selected")}
              onClick={() => {}}
            />
            <AdminFormFieldSubmit
              type="button"
              variant="primary-like"
              label={t("remove_all")}
              onClick={() => {}}
            />
            <div className="flex-grow"></div>
            <AdminFormFieldSubmit
              type="button"
              variant="success"
              label={tMain("save")}
              onClick={() => {}}
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
                  {[5, 6].map((grpItem, i) => {
                    return (
                      <GroupVehicleItem
                        key={i}
                        id={grpItem}
                        title={`Vehicle #${grpItem}`}
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