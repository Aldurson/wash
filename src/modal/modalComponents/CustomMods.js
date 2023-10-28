import { WorkoutsContext, WorkoutContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import {
  ModalHeader,
  ModalBody,
  Stack,
  ModalTitle,
  ModalFooter,
  Button,
} from "react-bootstrap";
import axios from "axios";

export const CustomHead = () => {
  const { workouts } = useContext(WorkoutsContext);
  const { workout, setWorkout } = useContext(WorkoutContext);
  useEffect(
    function () {
      //const temp = console.log("loading country image");
      axios
        .get(`https://flagcdn.com/40x30/${workout.country_code}.png`)
        .then((resp) => {
          //console.log("there was a response");

          setWorkout((prev) => {
            return { ...prev, flag: resp.data };
          });
        })
        .catch((err) => {
          console.log(`There is an error: ${err}`);
        });
    },
    [workout.country_code]
  );
  function DescriptFlag(img) {
    const divStyle = {
      backgroundImage: `url('${img}')`,
      width: "6px",
      height: "6px",
    };
    return <div className="flag" style={divStyle}></div>;
  }
  return (
    <ModalHeader>
      <ModalTitle>Enter Workout Details </ModalTitle>
      <img
        src={workout.flag}
        width="40"
        height="30"
        style={{ border: "1px solid red", borderRadius: "6px" }}
        alt="None"
      ></img>
    </ModalHeader>
  );
};
export const CustomBody = ({ onSubmit }) => {
  const { workout, setWorkout } = useContext(WorkoutContext);
  const [types, setTypes] = useState(false);
  function updateInput(evt) {
    setWorkout((prev) => {
      return { ...prev, [evt.target.name]: evt.target.value };
    });
  }
  useEffect(
    function () {
      // put all functions related to return of reverse,
      // geolocation here. find an api to get country flags
      const longDesc = `${workout.type[0].toUpperCase()}${workout.type.slice(
        1
      )} on ${workout.date} at ${workout.city}.`;

      const shDesc = `${workout.type[0].toUpperCase()}${workout.type.slice(
        1
      )} at city: ${workout.city}, country: ${workout.country}.`;

      setWorkout((prev) => {
        return { ...prev, description: longDesc, shortDescription: shDesc };
      });
      if (workout.type === "running") setTypes(true);
      if (workout.type === "cycling") setTypes(false);
    },
    [workout.type, workout.city]
  );
  return (
    <ModalBody>
      <form onSubmit={onSubmit}>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            <input
              aria-describedby="durDesc"
              min={0}
              name="duration"
              type="number"
              placeholder={0}
              onChange={updateInput}
              value={workout.duration}
              className="form-control"
            />
            <small id="durDesc" className="text muted">
              ⏰ Enter duration
            </small>
          </div>
          <div className="p-2">
            <input
              aria-describedby="distDesc"
              name="distance"
              type="number"
              min={0}
              placeholder={0}
              onChange={updateInput}
              value={workout.distance}
              className="form-control"
            />
            <small id="distDesc" className="text muted">
              {`${workout.type === "running" ? "🏃🏿‍♂️" : `🚵🏿‍♀️`} Enter distance`}
            </small>
          </div>
          <div className="p-2">
            <select
              onChange={updateInput}
              name="type"
              value={workout.type}
              aria-describedby="typDesc"
              className="form-control"
            >
              {["running", "cycling"].map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <small id="typDesc" className="text muted">
              {`${workout.type === "running" ? "🏃🏿‍♂️" : `🚵🏿‍♀️`} Select type`}
            </small>
          </div>
        </Stack>
        <Stack direction="horizontal" gap={4}>
          <div className="p-2">
            <input
              aria-describedby="coDesc"
              name="coords"
              value={`[${workout.coords[0]}, ${workout.coords[1]}]`}
              disabled={true}
              className="form-control"
            />
            <small id="coDesc" className="text muted">
              🌍 Co-ords
            </small>
          </div>
          <div className="p-2">
            <input
              aria-describedby="desDesc"
              name="description"
              value={workout.shortDescription}
              disabled={true}
              className="form-control"
              size={60}
            />
            <small id="desDesc" className="text muted">
              📰 Short Description
            </small>
          </div>
        </Stack>
        <Stack direction="horizontal" hidden={!types} gap={3}>
          <div className="p-2">
            <input
              className="form-control"
              name="cadence"
              value={workout.cadence}
              type="number"
              min={0}
              placeholder={0}
              onChange={updateInput}
              aria-describedby="cadDesc"
            />
            <small id="cadDesc" className="text muted">
              🦶🏿 Cadence
            </small>
          </div>
          <div className="p-2">
            <input
              className="form-control"
              name="pace"
              placeholder={0}
              disabled={true}
              aria-describedby="pacDesc"
              value={`${(workout.duration / workout.distance).toFixed(
                2
              )} min/m`}
            />
            <small id="pacDesc" className="text muted">
              ⚡️ Pace
            </small>
          </div>
        </Stack>
        <Stack direction="horizontal" hidden={types} gap={3}>
          <div className="p-2">
            <input
              className="form-control"
              name="elevation"
              min={0}
              value={workout.elevation}
              type="number"
              placeholder={0}
              onChange={updateInput}
              aria-describedby="elDesc"
            />
            <small id="elDesc" className="text muted">
              ⛰ Elevation
            </small>
          </div>
          <div className="p-2">
            <input
              className="form-control"
              name="speed"
              placeholder={0}
              disabled={true}
              aria-describedby="spDesc"
              value={`${(workout.distance / (workout.duration / 60)).toFixed(
                2
              )} km/h`}
            />
            <small id="spDesc" className="text muted">
              ⚡️ Speed
            </small>
          </div>
        </Stack>
      </form>
    </ModalBody>
  );
};
export const CustomFoot = ({ closeModal, submitModal }) => {
  return (
    <ModalFooter>
      <Button variant="outline-danger" onClick={closeModal}>
        Close
      </Button>
      <Button variant="outline-success" onClick={submitModal}>
        Submit
      </Button>
    </ModalFooter>
  );
};
