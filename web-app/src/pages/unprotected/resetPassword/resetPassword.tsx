import React from "react";
import { Link } from "react-router-dom";
import LandingWrapper from "../../../components/landing";
import { routeUrls } from "../../../navigation/routeUrls";

const ScreenResetPassword = () => {
  return (
    <LandingWrapper>

      <form action="#" className="mt-8 grid grid-cols-6 gap-6">

        <h1 className="col-span-6 mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Setup a new password
        </h1>

        <p className="col-span-6 mt-0 leading-relaxed text-gray-500">
          Please enter below a new password for your account.
        </p>

        <div className="col-span-6">
          <label htmlFor="NewPassword" className="block text-sm font-medium text-gray-700"> New Password </label>

          <input
            type="password"
            id="NewPassword"
            name="new_password"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="ConfirmPassword" className="block text-sm font-medium text-gray-700"> Confirm New Password </label>

          <input
            type="password"
            id="ConfirmPassword"
            name="confirm_new_password"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Reset Password
          </button>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Already have an account?{" "}
            <Link to={routeUrls.loginPage} className="text-gray-700 underline">Go back to Login</Link>.
          </p>
        </div>
      </form>
    </LandingWrapper>
  );
}
export default ScreenResetPassword;