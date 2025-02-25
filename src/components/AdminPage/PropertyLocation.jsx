import React, { useState, useRef, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";
import toast from "react-hot-toast";
import axios from "axios";

const LocationSelector = ({ setCoordinates, setAddress }) => {
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
  const autocompleteRef = useRef(null);
  const map = useMap();

  useEffect(() => {
    if (!window.google) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      { types: ["geocode"] }
    );

    //PLACE CHANGED USING AUTOCOMPLETE
    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (!place.geometry) return;

      const newLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      setPosition(newLocation);
      setCoordinates(newLocation);
      if (map) {
        map.setCenter(newLocation);
      }
      const getAddress = async (coordinates) => {
        console.log("inside address: " + coordinates);
        await axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${coordinates.lat},${coordinates.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
          )
          .then((response) => {
            if (response.data.results.length > 0) {
              setAddress(response.data.results[0].formatted_address);
            } else {
              toast.error("address unavailable for this place");
            }
          })
          .catch((error) => {
            console.error("Error fetching address: ", error);
          });
      };

      getAddress(newLocation);
    });
  }, [map, setAddress, setCoordinates]);

  //CHANGING COORDINATES THROUGH MAP
  const handleMapClick = (event) => {
    console.log(event);
    if (!event || !event.detail) return;

    const newCoords = {
      lat: event.detail.latLng.lat,
      lng: event.detail.latLng.lng,
    };

    setPosition(newCoords);
    setCoordinates(newCoords);

    //FETCHING ADDRESS USING GOOGLE MAPS API USING COORDINATES
    const getAddress = async (coordinates) => {
      console.log("inside address: " + coordinates);
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${coordinates.lat},${coordinates.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        )
        .then((response) => {
          if (response.data.results.length > 0) {
            setAddress(response.data.results[0].formatted_address);
          } else {
            toast.error("address unavailable for this place");
          }
        })
        .catch((error) => {
          console.error("Error fetching address: ", error);
        });
    };

    getAddress(newCoords);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Location Input */}
      <input
        id="autocomplete"
        type="text"
        placeholder="Enter location"
        className="p-3 border border-gray-400 rounded w-full"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {/* Google Map */}
      <div className="w-full h-60 relative">
        <Map
          mapId={process.env.REACT_APP_GOOGLE_MAPS_ID}
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          defaultZoom={12}
          defaultCenter={position}
          gestureHandling={"greedy"}
          disableDefaultUI
          onClick={handleMapClick}
        >
          <AdvancedMarker position={position} />
        </Map>
      </div>
    </div>
  );
};

const PropertyLocation = ({ setCoordinates, setAddress }) => {
  return (
    <APIProvider
      apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <div className="p-4 flex flex-col items-center w-2/3 gap-8 justify-center mx-auto">
        {/* LOCATION SELECTOR USING MAP*/}
        <LocationSelector
          setCoordinates={setCoordinates}
          setAddress={setAddress}
        />
      </div>
    </APIProvider>
  );
};

export default PropertyLocation;
