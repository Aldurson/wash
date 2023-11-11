import L from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import img1 from "../img/run.gif";
import img2 from "../img/cycle.gif";

import { COORDS, URL, ATTRIBUTION } from "./config.js";

function getIcon(type) {
  return L.icon({
    iconUrl: type === "running" ? img1 : img2,
    iconSize: [100, 100],
    iconAnchor: [50, 100],
  });
}
function RenderMarker({ position }) {
  return (
    <Marker
      position={position.coords}
      icon={getIcon(position.type)}
      eventHandlers={{
        mouseover: (evt) => evt.target.openPopup(),
        mouseout: (evt) => evt.target.closePopup(),
        click: (evt) => evt.target.openPopup(),
      }}
    >
      <Popup
        closeButton={false}
        className={`${position.type}-popup`}
        offset={[0, -80]}
      >
        {position.shortDescription}
      </Popup>
    </Marker>
  );
}
export const Map = () => {
  return (
    <>
      <MapContainer zoom={13} center={COORDS} id="map">
        <TileLayer url={URL} attribution={ATTRIBUTION} />
      </MapContainer>
    </>
  );
};
