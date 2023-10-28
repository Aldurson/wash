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
        className="menu_item"
        onClick={() => {
          console.log("clicked");
          //console.log(workout);
          setCenter(workout.coords);
        }}
      >
        <img src={workout.flag} width={40} height={30}></img>
        <Stack direction="horizontal" gap={2}>
          <div className="p-2">
            <label
              className="form-label"
              aria-describedby="durDesc"
              name="duration"
            >
              {workout.duration}
            </label>
            <small id="durDesc" className="text muted">
              ⏰ Duration
            </small>
          </div>
          <div className="p-2">
            <label
              aria-describedby="distDesc"
              name="distance"
              className="form-label"
            >
              {workout.distance}
            </label>
            <small id="distDesc" className="text muted">
              {`${workout.type === "running" ? "🏃🏿‍♂️" : `🚵🏿‍♀️`} Distance`}
            </small>
          </div>
          <div className="p-2">
            <label
              name="type"
              aria-describedby="typDesc"
              className="form-label"
            >
              {workout.type}
            </label>
            <small id="typDesc" className="text muted">
              {`${workout.type === "running" ? "🏃🏿‍♂️" : `🚵🏿‍♀️`} Type`}
            </small>
          </div>
        </Stack>
        <Stack direction="horizontal" gap={2}>
          <div className="p-2">
            <label
              aria-describedby="coDesc"
              name="coords"
              className="form-label"
            >{`[${workout.coords[0]}, ${workout.coords[1]}]`}</label>
            <small id="coDesc" className="text muted">
              🌍 Co-ords
            </small>
          </div>
          <div className="p-2">
            <label
              aria-describedby="desDesc"
              name="description"
              className="form-label"
              size={100}
            >
              {workout.description}
            </label>
            <small id="desDesc" className="text muted">
              📰 Description
            </small>
          </div>
        </Stack>
        <Stack direction="horizontal" gap={2}>
          <div className="p-2">
            <label
              className="form-label"
              name={workout.type === "running" ? "cadence" : "elevation"}
              aria-describedby="cadDesc"
            >
              {workout.type === "running" ? workout.cadence : workout.elevation}
            </label>
            <small id="cadDesc" className="text muted">
              {workout.type === "running" ? `🦶🏿 Cadence` : `⛰ Elevation`}
            </small>
          </div>
          <div className="p-2">
            <label
              className="form-label"
              name={workout.type === "running" ? "pace" : "speed"}
              aria-describedby="pacDesc"
              value={
                workout.type === "running"
                  ? `${workout.pace} min/m`
                  : `${workout.speed} km/h`
              }
            />
            <small id="pacDesc" className="text muted">
              {workout.type === "running" ? `⚡️ Pace` : `⚡️ Speed`}
            </small>
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
