import React, { FC } from "react";
import CollapseIcon from "../../assets/svg/collapse-icon.svg";
import ExpandMoreIcon from "../../assets/svg/expand-more-icon.svg";

interface GroupListProps {
    name: string;
    color: string;
    noOfVehicles: number;
    children: React.ReactNode;
    openByDefault?: boolean;
}


const GroupList: FC<GroupListProps> = ({name, color, noOfVehicles, children, openByDefault}) => {
  const [isOpen, setIsOpen] = React.useState(openByDefault);

    return (
        <div className="border-b px-3 py-2 border-gray-200 cursor-pointer">
            <div className="flex justify-between" onClick={() => setIsOpen(!isOpen)}>
              <div>
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-sm leading-6 text-blue-900">{name}</p>
                  <div className="p-1 bg-purple-600 rounded-full"></div> {/*// TODO DYNAMIC COLOR */}
                </div>
                <p className="font-normal text-xs leading-6 text-gray-500">Vehicle In Group: {noOfVehicles}</p>
              </div>
              <img src={isOpen ? CollapseIcon : ExpandMoreIcon} alt="expand-more-icon"  />
            </div>
            {isOpen && <div className="max-h-[412px] overflow-y-auto">{children}</div>}
        </div>
    );
}

export default GroupList;