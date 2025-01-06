import CarCreationScreen from "./components/CarCreator/CarCreationScreen";
import { FuelPriceComparator } from "./components/PriceComparator/FuelPriceComparator";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/NavBar";
import { Stack } from "react-bootstrap";
function App() {
  return (
    <Stack style={{ marginTop: "2rem" }}>
      <FuelPriceComparator />
      <NavBar />
    </Stack>
  );
}

export default App;
