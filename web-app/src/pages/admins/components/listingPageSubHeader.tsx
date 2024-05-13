import React, { FC } from "react";
import ButtonIconPlus from "../../../assets/svg/buttonicon-plus.svg";

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
      <button
        className="bg-blue-200 rounded-full ml-6 px-6 py-2 flex items-center gap-2 text-base font-medium whitespace-nowrap"
        onClick={buttonCallback}>
        {buttonText}
        <img
          src={ButtonIconPlus}
          alt={buttonText}
        />
      </button>
    </div>
  )
};
export default ListingPageSubHeader;
