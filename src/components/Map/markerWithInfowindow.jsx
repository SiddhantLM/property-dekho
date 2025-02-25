import React, { useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import MapCard from "../core/MapCard";

export const MarkerWithInfowindow = ({ item }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [clicked, setClicked] = useState(false);
  const handleLeave = () => {
    console.log(clicked);
    if (clicked) return;
    setInfowindowOpen(false);
  };
  return (
    <>
      <AdvancedMarker
        onMouseEnter={() => setInfowindowOpen(true)}
        onMouseLeave={() => handleLeave()}
        ref={markerRef}
        onClick={() => setClicked(true)}
        position={{ lat: item.coordinates.lat, lng: item.coordinates.lon }}
        title={"AdvancedMarker that opens an Infowindow when clicked."}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => {
            setInfowindowOpen(false);
            setClicked(false);
          }}
          minWidth={500}
          maxHeight={200}
        >
          <MapCard item={item} />
        </InfoWindow>
      )}
    </>
  );
};
