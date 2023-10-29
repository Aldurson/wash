import { WorkoutContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import {
  ModalHeader,
  ModalBody,
  Stack,
  ModalTitle,
  ModalFooter,
  Button,
} from "react-bootstrap";

export const CustomHead = () => {
  const { workout } = useContext(WorkoutContext);
  return (
    <ModalHeader>
      <ModalTitle>Enter Workout Details </ModalTitle>
      <img src={workout.flag} width="40" height="30" alt="None"></img>
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
      const isRunning = workout.type == "running";
      if (isRunning)
        setWorkout((prev) => {
          return {
            ...prev,
            pace: (workout.duration / workout.distance).toFixed(2),
          };
        });
      if (!isRunning)
        setWorkout((prev) => {
          return {
            ...prev,
            speed: (workout.duration / (workout.distance / 60)).toFixed(2),
          };
        });
    },
    [workout.distance, workout.duration, workout.type]
  );
  useEffect(
    function () {
      const isRunning = workout.type === "running";
      const longDesc = `${workout.type[0].toUpperCase()}${workout.type.slice(
        1
      )} on ${workout.date} in ${workout.country || "unknown"} at ${
        isRunning
          ? `cadence of ${workout.cadence} spm`
          : `elevation of ${workout.elevation} m`
      } at ${
        isRunning
          ? `pace of ${workout.pace} min/km`
          : `speed of ${workout.speed} km/h`
      }.`;
      const shDesc = `${workout.type[0].toUpperCase()}${workout.type.slice(
        1
      )} at ${workout.city || "unknown city"}, ${
        workout.country || "unknown country"
      }.`;
      setWorkout((prev) => {
        return { ...prev, description: longDesc, shortDescription: shDesc };
      });
      if (workout.type === "running") setTypes(true);
      if (workout.type === "cycling") setTypes(false);
    },
    [workout.type, workout.city, workout.cadence, workout.pace]
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
              🦶🏿 Cadence (spm)
            </small>
          </div>
          <div className="p-2">
            <input
              className="form-control"
              name="pace"
              placeholder={0}
              type="number"
              disabled={true}
              aria-describedby="pacDesc"
              value={workout.pace}
            />
            <small id="pacDesc" className="text muted">
              ⚡️ Pace (min/m)
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
              ⛰ Elevation (m)
            </small>
          </div>
          <div className="p-2">
            <input
              className="form-control"
              name="speed"
              type="number"
              placeholder={0}
              disabled={true}
              aria-describedby="spDesc"
              value={workout.speed}
            />
            <small id="spDesc" className="text muted">
              ⚡️ Speed (km/h)
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
