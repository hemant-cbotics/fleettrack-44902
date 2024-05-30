import React, { FC, useState } from 'react';
import { TGroupList } from './type';
import { TModalsState, setModalsData } from '../../api/store/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AdminFormFieldCheckbox, AdminFormFieldSubmit } from '../../components/admin/formFields';

interface GroupSelectorModalProps {
  filteredGroupData: TGroupList[];
  setFilteredGroupData: (groupData: TGroupList[]) => void;
}

const GroupSelectorModal: FC<GroupSelectorModalProps> = ({filteredGroupData, setFilteredGroupData}) => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'mapOverview.groupSelector' });
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    hideModal();
  }

const [allChecked, setAllChecked] = useState(false);

const handleAllCheckboxChange = (e:any) => {
  setAllChecked(prevState => !prevState);
  if(e.target.checked){
    setFilteredGroupData(filteredGroupData.map(group => ({ ...group, checked: true })));
  }
};

  const hideModal = () => {
    dispatch(setModalsData({ ...modalsState, showGroupSelector: false }));
  };

  if(modalsState.showGroupSelector === false) return null;
  return (
    <>
      <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="fixed w-full h-screen bg-modal-overlay z-overlay"></div>
        <div className="relative my-6 mx-auto max-w-[calc(100vw-4rem)] w-[416px] z-modal">

          <form  className="p-8 bg-white grid grid-cols-6 gap-6 rounded-3xl shadow-2xl" onSubmit={handleSubmit}>
            
            <h2 className="col-span-6 text-3xl font-bold text-heading-black">
                {t("heading")}
            </h2>

            <p className="col-span-6 mt-0 leading-relaxed text-gray-500">
              {t("sub_heading")}
            </p>

            <div className="col-span-6 grid grid-cols-6 gap-2 max-h-[400px] overflow-y-auto">
              <div className='col-span-6'>
                <AdminFormFieldCheckbox
                  id='all'
                  label='All Groups'
                  type='checkbox'
                  name='all'
                  checked={allChecked}
                  onChange={handleAllCheckboxChange}
                />
              </div>
              {filteredGroupData?.map((group: TGroupList, index: number) => (
                <div className='col-span-6' key={index}>
                  <AdminFormFieldCheckbox
                    id={group.name}
                    label={group.name}
                    type='checkbox'
                    name={group.name}
                    checked={group.checked}
                    onChange={() => {
                      setFilteredGroupData(filteredGroupData.map((grp) => {
                        if(grp.name === group.name) {
                          return { ...grp, checked: !grp.checked }
                        }
                        return grp;
                      }))
                    }}
                  />
                </div>
              ))}
            </div>

            <AdminFormFieldSubmit
              label={tMain('confirm')}
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
}

export default GroupSelectorModal;