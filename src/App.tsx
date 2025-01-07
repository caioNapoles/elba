import CarCreationScreen from "./components/CarCreator/CarCreationScreen";
import { FuelPriceComparator } from "./components/PriceComparator/FuelPriceComparator";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/NavBar";
import { Stack, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useState } from "react";
import { Fuel, MapPinned, CarFront, Settings, Component } from "lucide-react";
import { ComponentHub } from "./components/NavBar/ComponentHub";
function App() {
  return (
  <NavBar />
  );
}

export default App;
