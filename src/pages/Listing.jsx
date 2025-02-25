import React, { useEffect, useState } from "react";
import Card from "../components/core/Card";
import Modal from "../components/core/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("list");
  const [modal, setModal] = useState(false);
  const [property, setProperty] = useState("");

  // MODAL CLOSE HANDLER
  const handleClose = () => {
    setModal(false);
    setProperty("");
  };

  // CARD DETAILS BUTTON HANDLER
  const handleDetails = (x) => {
    setModal(true);
    setProperty(data.find((item) => item._id === x._id));
    console.log(property);
  };

  // NAVBAR BUTTON HANDLER
  const handlePageChange = (page) => {
    setActive(page.label);
    if (page.label === "map") {
      navigate("/user/map");
      toast.success("Map page entered");
    }
  };

  const pages = [
    {
      id: 1,
      label: "list",
    },
    {
      id: 2,
      label: "map",
    },
  ];

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
          modal
            ? "blur opacity-90 pointer-events-none overflow-hidden h-[100vh]"
            : ""
        }`}
      >
        {/* NAVBAR */}
        <div className=" top-3 left-1/2 transform -translate-x-1/2 px-10 py-5 h-[70px] inline-flex gap-10 mx-auto items-center justify-center fixed z-[1000] ">
          {pages.map((page) => (
            <div
              onClick={() => handlePageChange(page)}
              key={page.id}
              className={`w-32 h-14 flex items-center justify-center uppercase bg-[#fffdd0]  font-bold text-2xl rounded-full cursor-pointer hover:underline hover:underline-offset-4 shadow-2xl ${
                active === page.label ? "underline underline-offset-4" : ""
              }`}
            >
              {page.label}{" "}
            </div>
          ))}
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
                <Card data={data} handleDetails={handleDetails} />
              </div>
            ))}
        </div>
      </div>

      {/* MODAL FOR CARDS */}
      {modal ? <Modal property={property} handleClose={handleClose} /> : null}
    </>
  );
};

export default HomePage;
