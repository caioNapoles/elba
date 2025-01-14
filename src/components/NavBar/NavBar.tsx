import { Fuel, MapPinned, CarFront, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Stack, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { ComponentHub } from "./ComponentHub";
import SettingsClass from "../../class/SettingsClass";

const NavBar = () => {
  const [screen, setScreen] = useState<number>(1);

  useEffect(() => {
    const userSettings = new SettingsClass();
    userSettings.read();
    userSettings.applyTheme();
  }, []);

  return (
    <Stack style={{ marginTop: "6rem" }}>
      <ComponentHub currentScreen={screen} />
      <ToggleButtonGroup
        type="radio"
        name="options"
        defaultValue={screen}
        onChange={(val: number) => setScreen(val)}
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
    </Stack>
  );
};

export default NavBar;
