import reactDom from "react-dom/client";
import "./css/styles.css";
import React, { useState, createContext, useEffect } from "react";
import { Map } from "./components/Map";
import { CustomModal } from "./components/CustomModal";
import { Sidebar } from "./components/Sidebar";
import { clearWorkout } from "./components/config.js";
import { Login } from "./components/Login";
const root = reactDom.createRoot(document.getElementById("root"));

export const WorkoutContext = createContext(null);
export const WorkoutsContext = createContext(null);

const App = () => {
  const [workouts, setWorkouts] = useState(getStorage());
  const [workout, setWorkout] = useState(clearWorkout());
  const [center, setCenter] = useState([]);
  const [active, setActive] = useState(false);

  function getStorage() {
    const regen3 = (dat) => {
      //dat.protoype.name = await setName(dat.lat, dat.lng);
      if (dat.type === "running")
        (dat.pace = dat.duration / dat.distance).toFixed(3);
      if (dat.type !== "running")
        (dat.speed = dat.distance / (dat.duration / 60)).toFixed(3);
      dat.shortDescription = `${dat.type[0].toUpperCase()}${dat.type.slice(
        1
      )} at ${dat.name}.`;
      dat.description = `${dat.type[0].toUpperCase()}${dat.type.slice(1)} on ${
        dat.date
      } at ${dat.name}.`;
      return dat;
    };
    //localStorage.removeItem("workouts");
    const data = JSON.parse(localStorage.getItem("workouts"));
    if (!data) return [];
    return data.map((dat) => regen3(dat));
  }
  useEffect(
    function () {
      if (!workouts) return;
      localStorage.removeItem("workouts");
      localStorage.setItem("workouts", JSON.stringify(workouts));
    },
    [workouts]
  );
  return (
    <>
      <div className="container">
        <React.StrictMode>
          <WorkoutContext.Provider value={{ workout, setWorkout }}>
            <WorkoutsContext.Provider value={{ workouts, setWorkouts }}>
              <Sidebar setCenter={setCenter} />
              <Map setActive={setActive} center={center} />
              <div
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  color: "red",
                  zIndex: "9000",
                  textAlign: "center",
                  justifyItems: "center",
                }}
              >
                Click on Map
              </div>
              <CustomModal active={active} setActive={setActive} />
            </WorkoutsContext.Provider>
          </WorkoutContext.Provider>
        </React.StrictMode>
      </div>
    </>
  );
};

root.render(<App />);
