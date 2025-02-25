import React from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({ property, handleClose }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-3/4 bg-[#fffdd0] rounded-md shadow-md">
      <div className="h-screen w-full ">
        {/* CLOSE BUTTON */}
        <div className="absolute right-3 top-3">
          <IoMdClose
            color={"black"}
            className="cursor-pointer text-4xl text-[#023020]"
            onClick={() => {
              handleClose();
            }}
          />
        </div>

        {/* PROPERTY CARD */}
        <div className="p-4 flex flex-col items-center w-2/3 gap-4 justify-center mx-auto">
          {/* PROPERTY NAME */}
          <h2 className="text-4xl capitalize font-bold text-[#023020]">
            {property.name}
          </h2>

          {/* IMAGE DIV */}
          <div className="flex w-full">
            <img src={property.img.url} alt={property.alt}></img>
          </div>

          {/* ADDRESS */}
          <div className="text-gray-500">{property.address}</div>

          {/* DESCRIPTION */}
          <div className="">{property.description}</div>
        </div>
        {/* PROPERTY CARD END */}
      </div>
    </div>
  );
};

export default Modal;
