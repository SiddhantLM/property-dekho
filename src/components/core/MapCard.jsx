import React from "react";

const MapCard = ({ item }) => {
  console.log(item);
  return (
    <div>
      <div className="w-full bg-[#fffdd0] shadow-2xl rounded-2xl flex flex-col items-center justify-center  ">
        {/* PROPERTY IMAGE */}
        <img src={item.img.url} alt="Property" className="h-52 object-cover" />
        <div className="p-5">
          {/* PROPERTY NAME */}
          <h2 className="text-xl font-bold text-gray-800 capitalize">
            {item.name}
          </h2>
          {/* PROPERTY ADDRESS */}
          <p className="text-gray-500 text-sm mt-1">{item.address}</p>
          {/* PROPERTY ADDRESS */}
          <p className="text-gray-600 mt-2">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MapCard;
