import { useDispatch, useSelector } from "react-redux";
import { TModalsState, setModalsData } from "../../api/store/commonSlice";
import { useTranslation } from "react-i18next";
import { AdminFormFieldSubmit } from "./formFields";
import { FC } from "react";

type DeleteConfirmationProps = {
  handleDeleteAdmin: () => void;
};

const DeleteConfirmation: FC<DeleteConfirmationProps> = ({
  handleDeleteAdmin,
}) => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation("translation", {
    keyPrefix: "admins.delete_confirmation",
  });
  const modalsState: TModalsState = useSelector(
    (state: any) => state.commonReducer.modals
  );
  const dispatch = useDispatch();
  const hideModal = () => {
    dispatch(setModalsData({ ...modalsState, showDeleteConfirmation: false }));
  };

  const handleSubmit = () => {
    hideModal();
    handleDeleteAdmin();
  };

  if (modalsState.showDeleteConfirmation === false) return null;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          className="fixed w-full h-screen bg-modal-overlay z-overlay"
          onClick={hideModal}
        ></div>
        <div className="relative my-6 mx-auto max-w-[calc(100vw-4rem)] w-[480px] z-modal">
          <form
            className="p-8 bg-white grid grid-cols-6 gap-6 rounded-3xl shadow-2xl"
            onSubmit={handleSubmit}
          >
            <h2 className="col-span-6 text-3xl font-bold text-heading-black">
              {t("heading")}
            </h2>
            <p className="col-span-6 mt-0 leading-relaxed text-gray-500">
              {t("sub_heading")}
            </p>
            <AdminFormFieldSubmit
              label={tMain("delete")}
              type="button"
              variant="primary"
              onClick={handleSubmit}
            />

            <AdminFormFieldSubmit
              label={tMain("cancel")}
              type="button"
              variant="danger-transparent"
              onClick={hideModal}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmation;
