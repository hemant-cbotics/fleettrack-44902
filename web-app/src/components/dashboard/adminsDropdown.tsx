import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setModalsData, TModalsState } from "../../api/store/commonSlice";
import { dashboardAdminsMenuItems } from "../../navigation/dashboardSideMenu";
import GearIcon from "../../assets/svg/setting-icon.svg";

const AdminsDropdown = () => {
  const navigate = useNavigate();
  const { t:tTop } = useTranslation("translation", { keyPrefix: "dashboard.top" });
  const { t } = useTranslation("translation", { keyPrefix: "dashboard.sidemenu" });
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();

  const toggleAdminsDropdown = (show: boolean) => {
    dispatch(setModalsData({ ...modalsState, showAdminsDropdown: show }))
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-screen z-overlay bg-modal-overlay${modalsState?.showAdminsDropdown ? '' : ' hidden'}`}
        onClick={() => toggleAdminsDropdown(false)}></div>
      <div className={`relative flex items-center justify-center${modalsState?.showAdminsDropdown ? ' z-modal' : ''}`}>
        <div title={tTop("admins")}>
          <img 
            src={GearIcon} 
            alt="gear-icon" 
            onClick={() => toggleAdminsDropdown(modalsState?.showAdminsDropdown ? false : true)}
            className="cursor-pointer"
            />
          <span className="sr-only">Admins Menu</span>
          <div
            className={`absolute top-full end-0 w-56 rounded-md border border-gray-100 bg-white shadow-lg z-modal${modalsState.showAdminsDropdown ? '' : ' hidden'}`}
            role="menu"
          >
            <div className="p-2">
              {dashboardAdminsMenuItems.map((item, index) => {
                const title = t(`admins.${item.slug}`);
                return (
                  <a
                    className="flex gap-3 rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
                    role="menuitem"
                    key={index}
                    onClick={() => {
                      toggleAdminsDropdown(false);
                      navigate(item.path)
                    }}
                  >
                    <img src={item.icon} alt={title} className="size-5" />
                    <span>{title}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminsDropdown;