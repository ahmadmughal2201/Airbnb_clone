import { FaFireAlt } from "react-icons/fa";
import {MdOutlineBedroomParent} from "react-icons/md";
import {GiWindow} from "react-icons/gi";
import {GiReceiveMoney} from "react-icons/gi";
import {GiFarmTractor} from "react-icons/gi";
import {FaMountainCity} from "react-icons/fa6";
import {BiSolidShocked} from "react-icons/bi";
import {FaUmbrellaBeach} from "react-icons/fa";




const Footer = () => {
  const icons = [
    <FaFireAlt />,
    <MdOutlineBedroomParent />,
    <GiWindow />,
    <GiReceiveMoney />,
    <GiFarmTractor />,
    <FaMountainCity />,
    <BiSolidShocked />,
    <FaUmbrellaBeach />,
  ];
  return (
    <div className="bg-white border-t-2 shadow-md  shadow-gray-300 sticky bottom-0 h-10 w-full flex items-center justify-center gap-6">
      {icons.map((icon) => (
        <div className="text-[30px] text-gray-600 hover:text-black duration-100 ease-out ">
          {icon}
        </div>
      ))}
    </div>
  );
};

export default Footer;