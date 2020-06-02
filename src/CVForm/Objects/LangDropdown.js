import React from "react";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function LangDropdown(props) {
  const levelDict = {
    x0: "Básico",
    x1: "Conversacional",
    x2: "Fluido",
    x3: "Nativo",
    a1: "A1",
    a2: "A2",
    b1: "B1",
    v2: "B2",
    c1: "C1",
    c2: "C2",
    i0: "ILR 0",
    i1: "ILR 1",
    i2: "ILR 2",
    i3: "ILR 3",
    i4: "ILR 4",
    i5: "ILR 5",
  };
  return (
    <DropdownButton
      title={levelDict[props.level] || "Nivel"}
      variant="outline-secondary"
      onSelect={(level) => props.updateLevel(level)}
    >
      {["x0", "x1", "x2", "x3"].map((l) => (
        <Dropdown.Item key={l} eventKey={l}>
          {" "}
          {levelDict[l]}{" "}
        </Dropdown.Item>
      ))}
      <Dropdown.Divider />
      {["a1", "a2", "b1", "b2", "c1", "c2"].map((l) => (
        <Dropdown.Item key={l} eventKey={l}>
          {" "}
          {levelDict[l]}{" "}
        </Dropdown.Item>
      ))}
      <Dropdown.Divider />
      {["i0", "i1", "i2", "i3", "i4", "i5"].map((l) => (
        <Dropdown.Item key={l} eventKey={l}>
          {" "}
          {levelDict[l]}{" "}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default LangDropdown;
