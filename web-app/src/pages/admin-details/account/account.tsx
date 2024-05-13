import Accordian from "../../../components/accordian";
import HeaderView from "../../../components/admin/headerView";
import { APP_CONFIG } from "../../../constants/constants";
import { AccountGeneralDetailForm } from "./account-form";

const ScreenAdminDetailAccount = () => {
  return (
    <>
      <HeaderView title="Account Information" />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex items-center font-semibold text-blue-900 text-lg leading-6">
          Edit Account Information
        </div>
        <div className="px-4">
          <div className="flex justify-end space-x-4">
            <button className="rounded-full bg-blue-200 px-6 py-2 font-medium text-lg leading-6 text-blue-900">
              Change Password
            </button>
            <button className="rounded-full bg-blue-200 px-6 py-2 font-medium text-lg leading-6 text-blue-900">
              Edit
            </button>
          </div>
          <div className="rounded-lg mt-2 bg-blue-200">
            <Accordian title="General Details" >
              <AccountGeneralDetailForm detail={""} onSubmit={() => {}} />
            </Accordian>
            <Accordian title="Maintainance Interval Labels" >
              <p>Hii</p>
            </Accordian>
            <Accordian title="Scorecard Weight Factors" >
              <p>Hii</p>
            </Accordian>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenAdminDetailAccount;
