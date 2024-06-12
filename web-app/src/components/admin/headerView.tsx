import { FC } from "react";
import LeftArrowIcon from "../../assets/svg/left-arrow-icon.svg";
import RefreshIcon from "../../assets/svg/refresh-icon.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { APP_CONFIG } from "../../constants/constants";

interface HeaderViewProps {
  title: string;
  showBackButton?: boolean;
  backButtonCallback?: () => void;
  // showRefreshButton?: boolean;
}

const HeaderView: FC<HeaderViewProps> = ({
  title,
  showBackButton = false,
  backButtonCallback,
  // showRefreshButton = true,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "admins" });
  const navigate = useNavigate();


  return (
    <header className={`flex justify-between ${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex items-center">
          {showBackButton && <img
            src={LeftArrowIcon}
            alt="left-arrow-icon"
            className="mr-4 p-2 bg-blue-200 rounded-full cursor-pointer"
            onClick={() => {
              if(!!backButtonCallback) backButtonCallback();
              else navigate(-1)
            }}
          />}
          <h1 className="font-bold text-blue-900 text-3xl leading-9">
            {title}
          </h1>
        </div>
        {/* {showRefreshButton && <div className="flex items-center">
          <button className="flex justify-between py-2">
            <p className="text-blue-900 font-medium text-base leading-5">
              {t("refresh_data")}
            </p>
            <img src={RefreshIcon} alt="refresh-icon" className="pl-2 " />
          </button>
        </div>} */}
      </header>
  )
}

export default HeaderView;