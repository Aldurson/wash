import React, { useContext, useEffect } from "react";
import { WorkoutContext, WorkoutsContext } from "../App";
import { Modal } from "react-bootstrap";
import { clearWorkout } from "../components/config.js";
import {
  CustomBody,
  CustomFoot,
  CustomHead,
} from "./modalComponents/CustomMods";

export const CustomModal = ({ active, setActive }) => {
  const { workout, setWorkout } = useContext(WorkoutContext);
  const { workouts, setWorkouts } = useContext(WorkoutsContext);
  function closeModal() {
    setWorkout(clearWorkout());
    setActive(false);
  }
  function submitModal(evt) {
    // removing unused properties
    // const formatStruc = (workout) => {
    //for keeping the function pure, creates a copy of input
    //   const typeBool = workout.type === "running";
    //   const data = { ...workout };
    //   if (typeBool) delete data.elevation;
    //   if (!typeBool) delete data.cadence;

    // these can be generated
    //   ["pace", "shortDescription", "description", "speed"].map(
    //     (prop) => delete data[`${prop}`]
    //   );
    //   return data;
    // };
    evt.preventDefault();

    setWorkouts((prev) => [...prev, workout]);
  }
  useEffect(
    function () {
      closeModal();
    },
    [workouts]
  );
  return (
    <Modal show={active} onHide={closeModal} size="lg" centered={true}>
      <CustomHead />
      <CustomBody onSubmit={submitModal} />
      <CustomFoot closeModal={closeModal} submitModal={submitModal} />
    </Modal>
  );
};
