import React from "react";
import { FuelPriceComparator } from "../PriceComparator/FuelPriceComparator";
import TripPriceCalculator from "../TripPriceCalculator/TripPriceCalculator";
import MyCars from "../CarCreator/MyCars";
import SettingsScreen from "../SettingsScreen/SettingsScreen";

interface ComponentHubProps {
  currentScreen: number;
}

export const ComponentHub: React.FC<ComponentHubProps> = (props) => {
  if (props.currentScreen == 1) {
    return <FuelPriceComparator />;
  } else if (props.currentScreen == 2) {
    return <TripPriceCalculator />;
  } else if (props.currentScreen == 3) {
    return <MyCars />;
  } else if (props.currentScreen == 4) {
    return <SettingsScreen />;
  }

  return null;
};
