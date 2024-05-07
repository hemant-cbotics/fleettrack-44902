import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LandingWrapper from "../../../components/landing";
import { routeUrls } from "../../../navigation/routeUrls";

import './login.scss';

interface ScreenLoginProps {
  showSessionExpiredMessage?: boolean;
}

const ScreenLogin: FC<ScreenLoginProps> = ({ showSessionExpiredMessage }) => {
  useEffect(() => {
    if (showSessionExpiredMessage) {
      toast.error("Session expired. Please login again.");
    }
  }, [showSessionExpiredMessage]);
  return (
    <LandingWrapper>

      <form action="#" className="mt-8 grid grid-cols-6 gap-6">

        <div className="col-span-6">
          <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

          <input
            type="email"
            id="Email"
            name="email"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

          <input
            type="password"
            id="Password"
            name="password"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="MarketingAccept" className="flex gap-4">
            <input
              type="checkbox"
              id="MarketingAccept"
              name="marketing_accept"
              className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
            />

            <span className="text-sm text-gray-700">
              Remember me
            </span>
          </label>
        </div>

        <div className="col-span-6">
          <p className="text-sm text-gray-500">
            By logging in, you agree to our{" "}
            <Link to={routeUrls.termsAndConditions} className="text-gray-700 underline">terms and conditions</Link>
            {" "}and{" "}
            <Link to={routeUrls.privacyPolicy} className="text-gray-700 underline">privacy policy</Link>.
          </p>
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Sign In
          </button>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Forgot your password?{" "}
            <Link to={routeUrls.forgotPassword} className="text-gray-700 underline">Click here</Link>.
          </p>
        </div>
      </form>
    </LandingWrapper>
  );
}
export default ScreenLogin;