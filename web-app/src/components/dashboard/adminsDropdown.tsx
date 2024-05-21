import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setModalsData, TModalsState } from "../../api/store/commonSlice";
import { dashboardAdminsMenuItems } from "../../navigation/dashboardSideMenu";

const AdminsDropdown = () => {
  const navigate = useNavigate();
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
        <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
          <button
            className="px-4 py-2 flex text-sm/none text-gray-600 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
            onClick={() => toggleAdminsDropdown(modalsState?.showAdminsDropdown ? false : true)}
          >
            Admins...
            <span className="sr-only">Admins Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
                transform={`rotate(${modalsState.showAdminsDropdown ? 180 : 0} 10 10)`}
              />
            </svg>
          </button>

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