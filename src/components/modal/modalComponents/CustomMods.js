import { useContext } from "react";
import { DataContext } from "../../../App";
import {
  ModalHeader,
  ModalBody,
  ModalTitle,
  ModalFooter,
  Button,
} from "react-bootstrap";
import { CustomDough } from "../../CustomDough";

export const CustomHead = () => {
  return (
    <ModalHeader>
      <ModalTitle>Enter Workout Details </ModalTitle>
    </ModalHeader>
  );
};
export const CustomBody = () => {
  const data = useContext(DataContext);
  return (
    <ModalBody>
      <div className="charts">
        <CustomDough />
      </div>
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
