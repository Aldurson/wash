import { useContext } from "react";
import { WorkoutsContext } from "./App";
import React from "react";
import { Stack } from "react-bootstrap";
import "./css/styles.css";

export const Sidebar = ({ setCenter }) => {
  const { workouts } = useContext(WorkoutsContext);

  function MenuItem({ workout, setCenter }) {
    return (
      <div
        className={`menu_item workout--${workout.type}`}
        onClick={() => {
          console.log("clicked");
          //console.log(workout);
          setCenter(workout.coords);
        }}
      >
        <img src={workout.flag} width={40} height={30}></img>
        <Stack direction="horizontal" gap={1}>
          <div className="p-2">
            <label
              className="form-label"
              aria-describedby="durDesc"
              name="Duration"
              onMouseOver={(evt) => console.log(evt.target)}
              onMouseOut={(evt) => console.log(evt.target)}
            >
              ⏰ {workout.duration + " min"}
            </label>
          </div>
          <div className="p-2">
            <label
              aria-describedby="distDesc"
              name="distance"
              className="form-label"
              onMouseOver={(evt) => console.log(evt.target)}
              onMouseOut={(evt) => console.log(evt.target)}
            >
              {`${workout.type === "running" ? "🏃🏿‍♂️" : `🚵🏿‍♀️`} ${
                workout.distance
              } km`}
            </label>
          </div>
        </Stack>
        <Stack direction="horizontal" gap={1}>
          <div className="p-2">
            <label
              aria-describedby="coDesc"
              name="coords"
              className="form-label"
              onMouseOver={(evt) => console.log(evt.target)}
              onMouseOut={(evt) => console.log(evt.target)}
            >{`🌍 Co-ords : [${workout.coords[0]}, ${workout.coords[1]}]`}</label>
          </div>
        </Stack>
        <Stack direction="horizontal" gap={2}>
          <div className="p-2">
            <label
              aria-describedby="desDesc"
              name="description"
              className="form-label"
              onMouseOver={(evt) => console.log(evt.target)}
              onMouseOut={(evt) => console.log(evt.target)}
              size={100}
            >
              📰 Description : {workout.description}
            </label>
          </div>
        </Stack>
        <Stack direction="horizontal" gap={2}>
          <div className="p-2">
            <label
              className="form-label"
              name={workout.type === "running" ? "cadence" : "elevation"}
              aria-describedby="cadDesc"
            >
              {workout.type === "running" ? `🦶🏿 Cadence` : `⛰ Elevation`}{" "}
              {workout.type === "running" ? workout.cadence : workout.elevation}
            </label>
          </div>
          <div className="p-2">
            <label
              className="form-label"
              name={workout.type === "running" ? "pace" : "speed"}
              aria-describedby="pacDesc"
              value={`${
                workout.type === "running" ? `⚡️ Pace` : `⚡️ Speed`
              } ${
                workout.type === "running"
                  ? `${workout.pace} min/m`
                  : `${workout.speed} km/h`
              }`}
            />
          </div>
        </Stack>
      </div>
    );
  }
  return (
    <div className="sidebar">
      <h2>Exercises</h2>
      {workouts.map((workout, i) => (
        <MenuItem key={i} workout={workout} setCenter={setCenter} />
      ))}
    </div>
  );
};
