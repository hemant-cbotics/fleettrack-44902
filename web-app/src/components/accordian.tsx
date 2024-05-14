import { FC, useState } from "react";
import ExpandMoreIcon from "../assets/svg/expand-more-icon.svg";
import CollapseIcon from "../assets/svg/collapse-icon.svg";


interface AccordianProps {
  title: string;
  children: React.ReactNode;
  openByDefault?: boolean;
}

const Accordian: FC<AccordianProps> = ({ title, children, openByDefault = false }) => {
    const [isOpen, setIsOpen] = useState(openByDefault);

    return (
      <div className="border-b border-gray-200">
        <div className="px-5 py-[10px] flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <div className="text-lg font-semibold leading-10 tracking-tighter text-blue-900">{title}</div>
          <img src={isOpen ? CollapseIcon : ExpandMoreIcon} alt="expand-more-icon" />
        </div>
        {isOpen && <div>{children}</div>}
      </div>
    )
}

export default Accordian;