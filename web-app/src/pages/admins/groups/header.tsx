import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { AdminFormFieldSubmit } from "../../../components/admin/formFields";
import ButtonIconPlus from "../../../assets/svg/buttonicon-plus.svg";

type TAdminsGroupsHeaderProps = {
  heading: string;
  ButtonElements?: React.ReactNode;
  addNewButtonCallback?: () => void;
  helpButtonCallback?: () => void;
  deleteButtonCallback?: () => void;
  disabled: boolean;
};

const AdminsGroupsHeader: FC<TAdminsGroupsHeaderProps> = ({
  heading,
  ButtonElements = <></>,
  addNewButtonCallback = () => {},
  helpButtonCallback = () => {},
  deleteButtonCallback = () => {},
  disabled = false
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'admins.groups'});
  const { t: tMain } = useTranslation();
  return (
    <div className="flex items-center gap-2">
      <h2 className="flex items-center">
        <p className="text-lg font-bold leading-6">{heading}</p>
      </h2>
      <div className="flex-grow"></div>
      {ButtonElements}
      <AdminFormFieldSubmit
        type="button"
        variant="primary-like"
        label={<span className="flex justify-center whitespace-nowrap">
          {t("add_new")}
          <img
            className="ml-2"
            src={ButtonIconPlus}
            alt={t("add_new")}
          />
        </span>}
        onClick={addNewButtonCallback}
      />
      <AdminFormFieldSubmit
        type="button"
        variant="primary-like"
        label={tMain("help")}
        onClick={helpButtonCallback}
      />
      <AdminFormFieldSubmit
        type="button"
        variant="danger"
        label={tMain("delete")}
        onClick={deleteButtonCallback}
        disabled={disabled}
      />
    </div>
  )
}
export default AdminsGroupsHeader;