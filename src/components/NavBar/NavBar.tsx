import { Fuel, MapPinned, CarFront, Settings } from "lucide-react";
import { useState } from "react";
import {
  ButtonGroup,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const NavBar = () => {
  return (
    <div>
      <ToggleButtonGroup
        type="radio"
        name="options"
        defaultValue={1}
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
        }}
      >
        <ToggleButton
          id="fuel-screen"
          value={1}
          variant="secondary"
          style={{ borderRadius: 0 }}
        >
          <Fuel />
        </ToggleButton>

        <ToggleButton id="trip-screen" value={2} variant="secondary">
          <MapPinned />
        </ToggleButton>

        <ToggleButton id="car-screen" value={3} variant="secondary">
          <CarFront />
        </ToggleButton>

        <ToggleButton
          id="settings-screen"
          value={4}
          variant="secondary"
          style={{ borderRadius: 0 }}
        >
          <Settings />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default NavBar;
