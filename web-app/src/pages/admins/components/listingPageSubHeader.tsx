import React, { FC } from "react";
import ButtonIconPlus from "../../../assets/svg/buttonicon-plus.svg";
import { AdminFormFieldSubmit } from "../../../components/admin/formFields";

type TListingPageSubHeaderProps = {
  heading: string;
  buttonText?: string;
  buttonCallback?: () => void;
};

const ListingPageSubHeader: FC<TListingPageSubHeaderProps> = ({ heading, buttonText, buttonCallback }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-blue-900 text-base font-semibold leading-6">
        {heading}
      </h2>
      <div className="w-44">
        <AdminFormFieldSubmit
          type="button"
          variant="primary"
          label={<span className="flex justify-center whitespace-nowrap">
            {buttonText}
            <img
              className="ml-2"
              src={ButtonIconPlus}
              alt={buttonText}
            />
          </span>}
          onClick={buttonCallback}
        />
      </div>
    </div>
  )
};
export default ListingPageSubHeader;
