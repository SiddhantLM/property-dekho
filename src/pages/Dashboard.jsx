import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Card from "../components/core/Card";
import Modal from "../components/core/Modal";
import AddProperty from "../components/AdminPage/AddProperty";

const Dashboard = () => {
  const [modal, setModal] = useState(false);
  const [property, setProperty] = useState("");
  const [addModal, setAddModal] = useState(false);

  // MODAL CLOSE HANDLER
  const handleClose = () => {
    setModal(false);
    setAddModal(false);
    setProperty("");
  };

  // CARD DETAILS BUTTON HANDLER
  const handleDetails = (x) => {
    setModal(true);
    setProperty(data.find((item) => item._id === x._id));
    console.log(property);
  };

  //FETCHING DATA
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.REACT_APP_BASE_URL + "/api/property/all";
        const response = await axios.get(url);
        console.log(response);
        setData(response.data.properties);
        toast.success("data fetched successfully");
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div
        className={`bg-[#023020] min-h-screen ${
          modal || addModal
            ? "blur opacity-90 pointer-events-none overflow-hidden h-[100vh]"
            : ""
        }`}
      >
        {/* NAVBAR */}
        <div className=" top-3 left-1/2 transform -translate-x-1/2 px-10 py-5 h-[70px] inline-flex gap-10 mx-auto items-center justify-center fixed z-[1000] ">
          <div
            className={`w-32 h-14 flex items-center justify-center uppercase bg-[#fffdd0]  font-bold text-2xl rounded-full cursor-pointer hover:underline hover:underline-offset-4 shadow-2xl underline underline-offset-4 `}
          >
            list
          </div>
        </div>
        {/* NAVBAR END */}

        {/* FILLER DIV */}
        <div className="h-[90px]" />

        {/* CONTENT DIV */}
        <div className="flex px-20 gap-10 w-[80%] mx-auto  justify-center flex-wrap pb-28">
          {data &&
            data.map((data, index) => (
              // CARD DIV
              <div key={index} className="mr-4 mt-5">
                <Card
                  data={data}
                  handleDetails={handleDetails}
                  page={"admin"}
                  setData={setData}
                />
              </div>
            ))}
        </div>

        <div className="pb-32 text-center">
          <button
            className="px-32 py-6 text-4xl rounded-2xl font-bold bg-[#EAAA00] text-[#023020] transform transition duration-300 hover:scale-105"
            onClick={() => setAddModal(true)}
          >
            ADD PROPERTY
          </button>
        </div>
      </div>

      {/* MODAL FOR CARDS */}
      {modal ? (
        <Modal property={property} handleClose={handleClose} page={"admin"} />
      ) : null}

      {addModal ? (
        <AddProperty handleClose={handleClose} setData={setData} />
      ) : null}
    </>
  );
};

export default Dashboard;
