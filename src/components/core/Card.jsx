import axios from "axios";
// import React, { useState } from "react";
import toast from "react-hot-toast";

const Card = ({ data, handleDetails, page = "user", setData }) => {
  //PROPERTY DELETE API
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const id = data._id;
      const response = await axios.post(
        "http://localhost:4000/api/property/delete",
        { id },
        config
      );
      console.log("Property deleted successfully");
      setData(response.data.property);
      toast.success("Property deleted successfully");
    } catch (error) {
      toast.error("error");
      console.log("Error deleting property:", error);
    }
  };

  return (
    <div className="w-96 bg-[#fffdd0] shadow-2xl rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105">
      {/* PROPERTY IMAGE */}
      <img
        src={data.img.url}
        alt="Property"
        className="w-full h-52 object-cover"
      />
      <div className="p-5">
        {/* PROPERTY NAME */}
        <h2 className="text-xl font-bold text-gray-800 capitalize">
          {data.name}
        </h2>
        {/* PROPERTY ADDRESS */}
        <p className="text-gray-500 text-sm mt-1">{data.address}</p>
        {/* PROPERTY ADDRESS */}
        <p className="text-gray-600 mt-2">{data.description}</p>
        {/* MODAL BUTTON */}
        <button
          className="mt-4 bg-[#023020] text-white px-4 py-2 rounded-lg "
          onClick={() => handleDetails(data)}
        >
          View Details
        </button>

        {page === "admin" && (
          <button
            className="mt-4 bg-[#023020] text-white px-4 py-2 rounded-lg ml-6"
            onClick={() => handleDelete()}
          >
            Delete Property
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
