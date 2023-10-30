import L from "leaflet";
import React, { useContext, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import img1 from "../img/run.gif";
import img2 from "../img/cycle.gif";
import { WorkoutContext, WorkoutsContext } from "../App";
import {
  COORDS,
  URL,
  ATTRIBUTION,
  reverseGeocodingUrl,
  revGeoApi,
} from "./config.js";

function getIcon(type) {
  return L.icon({
    iconUrl: type === "running" ? img1 : img2,
    iconSize: [100, 100],
    iconAnchor: [50, 100],
  });
}
function RenderMarker({ workout }) {
  return (
    <Marker
      position={workout.coords}
      icon={getIcon(workout.type)}
      eventHandlers={{
        mouseover: (evt) => evt.target.openPopup(),
        mouseout: (evt) => evt.target.closePopup(),
        click: (evt) => evt.target.openPopup(),
      }}
    >
      <Popup
        closeButton={false}
        className={`${workout.type}-popup`}
        offset={[0, -80]}
      >
        {workout.shortDescription}
      </Popup>
    </Marker>
  );
}
export const Map = ({ setActive, center, setCred }) => {
  const { setWorkout } = useContext(WorkoutContext);
  const { workouts } = useContext(WorkoutsContext);

  function MoveTo({ mCoords }) {
    const map = useMap();
    useEffect(
      function () {
        if (!mCoords) return null;
        const coords = L.latLng(mCoords);
        if (!coords) return;
        map.panTo(coords, { animate: true, duration: 2 });
      },
      [mCoords]
    );
    return null;
  }
  function setName(lat, lng) {
    const url = reverseGeocodingUrl(lat, lng, revGeoApi);
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        const {
          city,
          country,
          country_code,
          state,
          streetname,
          popularity,
          county,
          suburb,
          timezone,
        } = data.features[0].properties;

        setWorkout((prev) => {
          return {
            ...prev,
            city: city,
            country: country,
            state: state,
            country_code: country_code,
            flag: `https://flagcdn.com/40x30/${country_code}.png`,
          };
        });
      })
      .catch((err) => {
        console.log(`error Tlale ${err}`);
        setWorkout((prev) => {
          return { ...prev, name: "No Name" };
        });
      });
  }
  function EventHandlers() {
    const map = useMapEvents({
      click(evt) {
        const formatDate = (date) => {
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          };
          return Intl.DateTimeFormat("en-ZA", options).format(date);
        };
        const { lat, lng } = evt.latlng;
        const id = (Date.now() + "").slice(-10);
        const date = formatDate(new Date());

        setName(lat, lng);
        setWorkout((prev) => {
          return {
            ...prev,
            id: id,
            coords: [lat.toFixed(3), lng.toFixed(3)],
            date: date,
          };
        });
        setActive(true);
      },
    });
  }
  function updateInput(evt) {
    setCred((prev) => {
      return { ...prev, [evt.target.name]: evt.target.value };
    });
  }
  return (
    <>
      <MapContainer zoom={13} center={COORDS} id="map">
        <TileLayer url={URL} attribution={ATTRIBUTION} />
        <EventHandlers />
        <MoveTo mCoords={center} />
        {workouts.map((workout, i) => (
          <RenderMarker key={i} workout={workout} />
        ))}
      </MapContainer>
    </>
  );
};