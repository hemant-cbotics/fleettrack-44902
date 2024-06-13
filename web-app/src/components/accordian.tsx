import { FC, useState } from "react";
import ExpandMoreIcon from "../assets/svg/expand-more-icon.svg";
import CollapseIcon from "../assets/svg/collapse-icon.svg";


interface AccordianProps {
  title: string;
  children: React.ReactNode;
  openByDefault?: boolean;
  collapsible?: boolean;
  hasDetailsPage?: boolean;
}

const Accordian: FC<AccordianProps> = ({
  title,
  children,
  openByDefault = false,
  collapsible = true,
  hasDetailsPage = true,
}) => {
    const [isOpen, setIsOpen] = useState(openByDefault);

    return (
      <div className={`${hasDetailsPage ? "border-b border-gray-200" : ""}`}>
        <div
          className={`${hasDetailsPage ? "px-5" : ""} py-[10px] flex justify-between items-center${collapsible ? " cursor-pointer" : ''}`}
          {...(collapsible ? { onClick: () => setIsOpen(!isOpen) } : {})}
        >
          <div className="text-lg font-semibold leading-10 tracking-tighter text-blue-900">{title}</div>
          {collapsible && (<img src={isOpen ? CollapseIcon : ExpandMoreIcon} alt="expand-more-icon" />)}
        </div>
        {isOpen && <div>{children}</div>}
      </div>
    )
}

export default Accordian;