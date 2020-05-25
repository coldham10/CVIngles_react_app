import React from "react";
import Toast from "react-bootstrap/Toast";

function SaveToast(props) {
  return (
    <Toast show={true} className="save-toast">
      {
        {
          SAVING: "Guardando",
          QUEUED: "Guardando",
          READY: "",
          FAILED: "Error guardando",
        }[props.status]
      }
    </Toast>
  );
}

export default SaveToast;
