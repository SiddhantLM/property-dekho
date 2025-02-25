import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import PropertyLocation from "./PropertyLocation";
import axios from "axios";
import toast from "react-hot-toast";
import FileUpload from "./FileUpload";

const AddProperty = ({ handleClose, setData }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [address, setAddress] = useState("");
  const [propertyImage, setPropertyImage] = useState();
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Perform form validation
    try {
      setLoading(true);
      console.log(propertyImage);
      if (!name || !desc || !address || !propertyImage || !coordinates) {
        alert("All fields are required!");
        return;
      }
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData(); // Create FormData object
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("address", address);
      formData.append("lat", coordinates.lat);
      formData.append("lon", coordinates.lng);
      formData.append("propertyImage", propertyImage);
      const response = await axios.post(
        "http://localhost:4000/api/property/add",
        formData,
        config
      );

      if (!response) {
        throw new Error("couldn't add property");
      }

      setData(response.data.property);

      toast.success("property added successfully");
    } catch (error) {
      console.error(error);
      //   toast.error("couldn't add property. Please try again later");
      toast.error("couldn't add property. Please try again later");
    } finally {
      setLoading(false);
      handleClose();
      setName("");
      setDesc("");
      setAddress("");
      setPropertyImage(null);
      setCoordinates({ lat: 0, lng: 0 });
    }
  };

  return (
    <div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3  bg-[#fffdd0] rounded-md  shadow-md ">
        <div className=" w-full max-h-fit">
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

          {/*ADD PROPERTY CARD */}
          <div className="p-4 flex overflow-y-scroll flex-col items-center w-full gap-8 justify-center mx-auto  max-h-fit py-8 ">
            {/* PROPERTY NAME */}
            <label className="h-10 flex flex-col items-center justify-center border-b-2 border-[#023020] ">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Property Name"
                className="p-3 outline-none  bg-inherit placeholder-[#023020]"
              />
            </label>
            {/* IMAGE DIV */}
            {/* <div
              className="flex flex-col items-center justify-center w-full max-w-md p-6 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-gray-100"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <p className="text-xl">Add Property Image</p>{" "}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="fileInput"
                onChange={handleFileChange}
              />
              <label
                htmlFor="fileInput"
                className="text-gray-600 cursor-pointer text-xs"
              >
                Click to upload or drag & drop an image
              </label>
              {propertyImage && (
                <div className="mt-4">
                  <p>{label}</p>
                </div>
              )}
            </div> */}
            <FileUpload setPropertyImage={setPropertyImage} />

            {/* ADDRESS */}
            {/* <label className="h-10 flex flex-col items-center justify-center border-b-2 border-[#023020] ">
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Property Address"
                className="p-3 outline-none  bg-inherit placeholder-[#023020]"
              />
            </label> */}
            {/* DESCRIPTION */}
            <label className="h-10 flex flex-col items-center justify-center border-b-2 border-[#023020] ">
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                type="text"
                placeholder="Property description"
                className="p-3 outline-none  bg-inherit placeholder-[#023020]"
              />
            </label>
            {/* LOCATION */}
            <PropertyLocation
              setCoordinates={setCoordinates}
              setAddress={setAddress}
            />

            {loading ? (
              <button className="px-6 py-3 bg-[#023020] text-[#fffdd0] rounded-lg">
                Loading...
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-[#023020] text-[#fffdd0] rounded-lg"
              >
                Submit
              </button>
            )}
          </div>
          {/* ADD PROPERTY CARD END */}
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
