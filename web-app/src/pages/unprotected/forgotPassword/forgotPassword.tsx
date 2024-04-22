import React from "react";
import { Link } from "react-router-dom";
import LandingWrapper from "../../../components/landing";
import { routeUrls } from "../../../navigation/routeUrls";

const ScreenForgotPassword = () => {
  return (
    <LandingWrapper>

      <form action="#" className="mt-8 grid grid-cols-6 gap-6">

        <h1 className="col-span-6 mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Reset your password
        </h1>

        <p className="col-span-6 mt-0 leading-relaxed text-gray-500">
          Please enter your email address below and we will send you a link to reset your password.
        </p>

        <div role="alert" className="col-span-6 rounded border-s-4 border-red-500 bg-red-50 p-4">
          <strong className="block font-bold text-red-800"> Something went wrong </strong>

          <p className="mt-2 text-sm text-red-700">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo quasi assumenda numquam deserunt
            consectetur autem nihil quos debitis dolor culpa.
          </p>
        </div>

        <div className="col-span-6">
          <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

          <input
            type="email"
            id="Email"
            name="email"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Send me the link
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
export default ScreenForgotPassword;