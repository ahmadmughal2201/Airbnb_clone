import React from "react";
import { BiSolidHotel} from "react-icons/bi";
import { FaHotel } from "react-icons/fa";
import { BsFillBuildingsFill } from "react-icons/bs";
import { MdOutlineHotelClass } from "react-icons/md";
import { RiHotelFill } from "react-icons/ri";
import { BsFillHouseFill } from "react-icons/bs";
import { GiMoebiusStar } from "react-icons/gi";
import Filter from "./Filter";
import { useMyContext } from './MyContext';


const Filters = () => {

  const {type, setType} = useMyContext();

  const sorting = [
    { title: "Hostel", icon: <FaHotel /> },
    { title: "Bed&Breakfast", icon: <BiSolidHotel /> },
    { title: "Motel", icon: <RiHotelFill /> },
    { title: "Suite", icon: <MdOutlineHotelClass /> },
    { title: "Guest House", icon: <BsFillHouseFill /> },
    { title: "Resort", icon: <GiMoebiusStar /> },
    { title: "Apartment", icon: <BsFillBuildingsFill /> },

  ];

  const handleFilterClick = (filterTitle) => {
    setType(filterTitle);
    console.log("Typye: ", type);
  };

  return (
    <div className="   ">
      <div className="flex justify-center  gap-4 sm:gap-4  mt-2 mb-2  ">
        {sorting.map((obj) => (
          <Filter key={obj.title}
          title={obj.title}
          icon={obj.icon}
          onClick={handleFilterClick}/>
        ))}
      </div>
    </div>
  );
};

export default Filters;