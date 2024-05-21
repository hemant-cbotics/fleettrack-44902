import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setModalsData, TModalsState } from "../api/store/commonSlice";
import EditIcon from "../assets/svg/edit-icon.svg";
import { AdminFormFieldSubmit } from "./admin/formFields";
import CheckableListItem from "./checkableListItem";

export const EditListingColumnsButton = () => {
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();
  
  return (
    <button
      className="absolute top-5 right-0 z-10 rounded-lg p-2 bg-accent-blue-pale"
      onClick={() => {
        dispatch(setModalsData({ ...modalsState, showEditColumns: true }))
      }}>
      <img src={EditIcon} alt="edit" />
    </button>
  )
}

export type TListingColumn = {
  name: string;
  show: boolean;
}

type TEditListingColumnsModalProps = {
  columns: TListingColumn[];
  setColumns: (columns: TListingColumn[]) => void;
}

export const EditListingColumnsModal: FC<TEditListingColumnsModalProps> = ({ columns, setColumns }) => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'admins.edit_columns'});
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    hideModal();
  }

  const hideModal = () => {
    dispatch(setModalsData({ ...modalsState, showEditColumns: false }));
  };

  if(modalsState.showEditColumns === false) return null;

  return (
    <>
      <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="fixed w-full h-screen bg-modal-overlay z-overlay" onClick={hideModal}></div>
        <div className="relative my-6 mx-auto max-w-[calc(100vw-4rem)] w-[560px] z-modal">
          
          <form className="p-8 bg-white grid grid-cols-6 gap-6 rounded-3xl shadow-2xl" onSubmit={handleSubmit}>

            <h2 className="col-span-6 text-3xl font-bold text-heading-black">
              {t("heading")}
            </h2>

            <p className="col-span-6 mt-0 leading-relaxed text-gray-500">
              {t("sub_heading")}
            </p>

            <div className="col-span-6 grid grid-cols-6 gap-2">
            {columns.map((column, index) => (
              <div className="col-span-6">
                <CheckableListItem
                  key={index}
                  id={`edit_col_checkbox_${index}`}
                  title={column.name}
                  checked={column.show}
                  handleChange={() => {
                    setColumns(columns.map((col, i) => {
                      if(i === index) {
                        return { ...col, show: !col.show }
                      }
                      return col;
                    }))
                  }}
                />
              </div>
            ))}
            </div>
            
            <AdminFormFieldSubmit
              label={t('submit_button')}
              type="button"
              variant="primary"
              onClick={handleSubmit}
            />
          
            <AdminFormFieldSubmit
              label={tMain('cancel')}
              type="button"
              variant="danger-transparent"
              onClick={hideModal}
            />
          </form>
        </div>
      </div>
    </>
  )
};