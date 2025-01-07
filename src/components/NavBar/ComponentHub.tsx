import React from "react";
import CarCreationScreen from "../CarCreator/CarCreationScreen";
import { FuelPriceComparator } from "../PriceComparator/FuelPriceComparator";
import TripPriceCalculator from "../TripPriceCalculator/TripPriceCalculator";

interface ComponentHubProps {
  currentScreen: number;
}

export const ComponentHub: React.FC<ComponentHubProps> = (props) => {
  if (props.currentScreen == 1) {
    return <FuelPriceComparator />;
  } else if (props.currentScreen == 2) {
    return <TripPriceCalculator />;
  } else if (props.currentScreen == 3) {
    return <CarCreationScreen />;
  }
  return null;
};
