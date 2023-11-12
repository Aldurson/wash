import React from "react";
import { Modal } from "react-bootstrap";
import {
  CustomBody,
  CustomFoot,
  CustomHead,
} from "./modal/modalComponents/CustomMods.js";

export const CustomModal = ({ active, setActive }) => {
  function closeModal() {
    setActive(false);
    console.log("Form closed");
  }
  function submitModal(evt) {
    evt.preventDefault();
    console.log("Form submitted");
  }
  return (
    <Modal show={active} onHide={closeModal} size="lg" centered={true}>
      <CustomHead />
      <CustomBody onSubmit={submitModal} />
      <CustomFoot closeModal={closeModal} submitModal={submitModal} />
    </Modal>
  );
};
