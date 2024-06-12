import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LandingWrapper from "../../../components/landing/landing";
import { routeUrls } from "../../../navigation/routeUrls";

interface ScreenFourZeroFourProps {
}

const ScreenFourZeroFour: FC<ScreenFourZeroFourProps> = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'fourZeroFourScreen' });

  return (
    <LandingWrapper>
      <div className="p-8 bg-white grid grid-cols-6 gap-6 rounded-3xl shadow-2xl">
        
        <h2 className="col-span-6 text-3xl font-bold text-heading-black">{t("heading")}</h2>
        
        <p className="col-span-6 text-base text-gray-500">{t("sub_heading")}</p>
        
        <Link
          to={routeUrls.landingPage}
          className={`col-span-6 flex items-center justify-center mt-4 h-12 w-full rounded-full border text-sm font-display font-semibold transition focus:outline-none focus:ring border-accent-blue-pale bg-accent-blue-pale text-accent-blue-dark enabled:hover:bg-accent-blue-dark enabled:hover:text-white active:bg-accent-blue-pale`}>
            {t('back_to_home')}
        </Link>
      </div>
    </LandingWrapper>
  );
}
export default ScreenFourZeroFour;