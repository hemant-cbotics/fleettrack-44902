import React, { FC } from "react";
import { APP_CONFIG } from "../../constants/constants";
import FilterIcon from "../../assets/svg/filter-icon.svg";
import { AdminFormFieldSubmit } from "../../components/admin/formFields";

interface HeaderViewProps {
  title: string;
  filterChange: () => void;
  groupSelectorCallback: () => void;
}

// NOT IN USE
const HeaderView: FC<HeaderViewProps> = ({ title, filterChange, groupSelectorCallback }) => {
  return (
    <header
      className={`flex justify-between ${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}
    >
      <div className="flex gap-6">
        <h1 className="font-bold text-blue-900 text-3xl leading-9">{title}</h1>
        <AdminFormFieldSubmit
          label="Group Selector"
          variant="primary"
          type="button"
          onClick={groupSelectorCallback}
        />
      </div>
      <div className="flex gap-4 items-center">
        {/* {showRefreshButton && <div className="flex items-center">
          <button className="flex justify-between py-2">
            <p className="text-blue-900 font-medium text-base leading-5">
              {t("refresh_data")}
            </p>
            <img src={RefreshIcon} alt="refresh-icon" className="pl-2 " />
          </button>
        </div>} */}
        <p>Road</p>
        <img
          src={FilterIcon}
          alt="filter-icon"
          className="p-2 bg-blue-200 rounded-lg cursor-pointer"
          onClick={filterChange}
        />
      </div>
    </header>
  );
};

export default HeaderView;
