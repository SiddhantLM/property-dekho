import React, { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { MarkerWithInfowindow } from "../components/Map/markerWithInfowindow";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Mapping = () => {
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const navigate = useNavigate();
  const [active, setActive] = useState("map");
  const [data, setData] = useState([]);

  const handlePageChange = (page) => {
    setActive(page.label);
    if (page.label === "list") {
      navigate("/user");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/property/all"
        );
        console.log(response);
        setData(response.data.properties);
        toast.success("data fetched successfully");
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(typeof API_KEY);
  }, [API_KEY]);
  return (
    <div>
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
      {/* NAVBAR ENDS */}

      {/* MAP PART */}
      {data ? (
        data.length > 0 ? (
          <APIProvider apiKey={API_KEY} libraries={["marker"]}>
            <Map
              mapId={process.env.REACT_APP_GOOGLE_MAPS_ID}
              defaultZoom={14}
              defaultCenter={{
                lat: data[0].coordinates.lat,
                lng: data[0].coordinates.lon,
              }}
              gestureHandling={"greedy"}
              disableDefaultUI
              style={{ width: "100%", height: "100vh" }}
            >
              {/* MARKERS */}
              {data.map((item) => (
                <MarkerWithInfowindow item={item} />
              ))}
            </Map>
          </APIProvider>
        ) : (
          <div className="mt-32">Data unavailable</div>
        )
      ) : (
        <div className="mt-32">Data Loading...</div>
      )}
      {/* MAP PART ENDS */}
    </div>
  );
};

export default Mapping;
