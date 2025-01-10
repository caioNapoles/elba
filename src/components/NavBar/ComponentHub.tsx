import React from "react";
import { FuelPriceComparator } from "../PriceComparator/FuelPriceComparator";
import TripPriceCalculator from "../TripPriceCalculator/TripPriceCalculator";
import SettingsScreen from "../SettingsScreen/SettingsScreen";
import MyCars from "../CarCreator/MyCars";

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
