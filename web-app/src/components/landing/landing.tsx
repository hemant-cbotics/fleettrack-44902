import React, { FC } from "react";
import logo from "../../assets/svg/logo-fleettrack.svg";
import landingImage from "../../assets/images/landing2.png"
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "../../navigation/routeUrls";

interface LandingWrapperProps extends React.PropsWithChildren {
  children: React.ReactNode;
}

const LandingWrapper: FC<LandingWrapperProps> = ({ children }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'landingScreen' });
  const navigate = useNavigate();

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex items-center bg-white lg:col-span-6 lg:h-full xl:col-span-6">
          <div className="flex flex-row lg:flex-col justify-center lg:p-12 lg:pb-0 w-full lg:w-auto">
            <div className="hidden lg:relative lg:block">
              <a className="block text-white cursor-pointer" onClick={() => navigate(routeUrls.landingPage)} title={APP_CONFIG.APP_NAME}>
                <span className="sr-only">Home</span>
                <img src={logo} alt={APP_CONFIG.APP_NAME} />
              </a>

              <h1 className="mt-10 font-display text-2xl font-extralight fw text-heading-gray444 sm:text-3xl md:text-4xl">
                {t('heading')}
              </h1>

              <p className="mt-4 leading-normal text-base text-heading-gray666">
                {t('content')}
              </p>
            </div>

            <img
              alt=""
              src={landingImage}
              className="object-contain h-48 m-12 lg:h-48 lg:mt-6"
            />
          </div>
        </section>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-6 lg:px-16 lg:py-12 xl:col-span-6 bg-panel-gray"
        >
          <div className="w-full max-w-md lg:max-w-lg">
            <div className="relative -mt-16 mb-6 block lg:hidden">
              <a
                className="inline-flex w-60 h-16 items-center justify-center rounded-full bg-white text-blue-600 cursor-pointer"
                onClick={() => navigate(routeUrls.landingPage)} title={APP_CONFIG.APP_NAME}
              >
                <span className="sr-only">{APP_CONFIG.APP_NAME}</span>
                <img className="h-10" src={logo} alt={APP_CONFIG.APP_NAME} />
              </a>
            </div>

            {children}

            <div className="relative block lg:hidden mt-12 mb-6">
              <h1 className="mt-2 text-2xl font-extralight fw text-heading-gray444 sm:text-3xl md:text-4xl">
                {t('heading')}
              </h1>

              <p className="mt-4 leading-relaxed text-base text-heading-gray666">
                {t('content')}
              </p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
export default LandingWrapper;