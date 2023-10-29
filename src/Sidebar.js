import { useContext, useState } from "react";
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
          setCenter(workout.coords);
        }}
      >
        <img src={workout.flag} width={40} height={30}></img>

        <p>⏰ {workout.duration + " min"}</p>

        <p>{`${workout.type === "running" ? "🏃🏿‍♂️" : `🚵🏿‍♀️`} ${
          workout.distance
        } km`}</p>

        <p>{`🌍 Co-ords : [${workout.coords[0]}, ${workout.coords[1]}]`}</p>
        <p>📰 Description : {workout.description}</p>
        <p>
          {" "}
          {workout.type === "running"
            ? `🦶🏿 Cadence : ${workout.cadence}`
            : `⛰ Elevation : ${workout.elevation}`}{" "}
        </p>
        <p>
          {" "}
          $
          {workout.type === "running"
            ? `⚡️ Pace : ${workout.pace} min/m`
            : `⚡️ Speed : ${workout.speed} km/h`}
        </p>
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
