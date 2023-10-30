import { useContext } from "react";
import { WorkoutsContext } from "../App";
import React from "react";

export const Sidebar = ({ setCenter }) => {
  const { workouts } = useContext(WorkoutsContext);

  function MenuItem({ workout, setCenter }) {
    return (
      <div
        className={`menu_item workout--${workout.type}`}
        onClick={() => {
          setCenter(workout.coords);
        }}
      >
        <div className="list_item">
          <p>
            {workout.type === "running" ? "🏃🏿‍♂️" : `🚵🏿‍♀️`} {workout.distance} km
          </p>
          <p>⏰ {workout.duration + " min"}</p>
          <img src={workout.flag} width={40} height={30}></img>
        </div>
        <div className="list_item">
          {" "}
          <p>
            {workout.type === "running"
              ? `⚡️ ${workout.pace} min/m`
              : `⚡️ ${workout.speed} km/h`}
          </p>{" "}
          <p>
            {workout.type === "running"
              ? `🦶🏿 ${workout.cadence} spm`
              : `⛰ ${workout.elevation} m`}
          </p>{" "}
          <p style={{ color: "red", fontSize: "0.7rem" }}>
            [{workout.coords[0]}, {workout.coords[1]}]
          </p>
        </div>
        <div>
          <p>📰 {workout.description}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="sidebar">
      <h2 style={{ textAlign: "center" }}>Exercises</h2>
      <div style={{ overflow: "auto" }}>
        {workouts.map((workout, i) => (
          <MenuItem key={i} workout={workout} setCenter={setCenter} />
        ))}
      </div>
    </div>
  );
};
