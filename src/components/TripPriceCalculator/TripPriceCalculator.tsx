import { CircleHelp, Car } from "lucide-react";
import {
  Container,
  Stack,
  Button,
  Form,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import CarClass from "../../class/CarClass";
import { useEffect, useState } from "react";

const TripPriceCalculator = () => {
  const noCar = new CarClass();
  noCar.name = "Select a car";

  const [carList, setCarList] = useState<CarClass[]>([]);
  const [currentCar, setCurrentCar] = useState<CarClass>(noCar);
  const [roundResult, setRoundResult] = useState(true);
  const [resultWindow, setResultWindow] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [errorWindow, setErrorWindow] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [distance, setDistance] = useState(0);
  const [fuelPrice, setFuelPrice] = useState(0);
  const [fuelChoice, setFuelChoice] = useState(1);

  useEffect(() => {
    const cars: CarClass[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const carString = localStorage.getItem(key);
        const car = new CarClass();
        car.readStringToCar(carString || "");
        if (car) {
          cars.push(car);
        }
      }
    }
    setCarList(cars);
  }, []);

  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      const selectedCar = carList[parseInt(eventKey)];
      setCurrentCar(selectedCar);
    }
  };

  const handleResult = () => {
    setErrorWindow(false);
    try {
      const resultMessage =
        "The cost of the trip is: $" + calculateCost().toString();
      setResult(resultMessage);
      setResultWindow(true);
    } catch (error) {
      setError((error as Error).message);

      if ((error as Error).message === "car is undefined") {
        setError("Please select a car!");
      }

      setErrorWindow(true);
    }
  };

  const calculateCost = () => {
    const car = currentCar;
    const fuel =
      fuelChoice === 1 ? "gas" : fuelChoice === 2 ? "ethanol" : "average";

    if (car.name == "Select a car") {
      throw new Error("Please select a car!");
    } else if (distance === 0 || fuelPrice === 0) {
      throw new Error("Please input the distance and price!");
    } else {
      const cost = distance * car.returnKmCost(fuelPrice, fuel);

      if (roundResult) {
        return Math.round(cost).toString();
      } else {
        return cost.toFixed(2);
      }
    }
  };

  return (
    <Container>
      <Stack gap={3}>
        <Stack
          direction="horizontal"
          gap={3}
          style={{ alignItems: "start", display: "flex" }}
        >
          <h1>Trip Cost Calculator</h1>
          <Button
            variant="outline-secondary"
            style={{ border: "none", marginLeft: "auto", padding: ".5rem" }}
          >
            <CircleHelp />
          </Button>
        </Stack>
        <Stack direction="horizontal" gap={3}>
          <Car />
          <Form.Select
            value={carList.indexOf(currentCar)}
            onChange={(e) => handleSelect(e.target.value)}
          >
            <option value="-1">Select a car</option>
            {carList.map((car, index) => (
              <option key={index} value={index}>
                {car.name}
              </option>
            ))}
          </Form.Select>
        </Stack>

        <Form.Group>
          <Form.Label>Distance (km)</Form.Label>
          <Form.Control
            type="number"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
          />
        </Form.Group>

        <Stack direction="horizontal" gap={3} style={{ alignItems: "end" }}>
          <Form.Group>
            <Form.Label>Fuel Price</Form.Label>
            <Form.Control
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(Number(e.target.value))}
            />
          </Form.Group>
          <ToggleButtonGroup
            type="radio"
            name="gas-ethanol"
            defaultValue={1}
            onChange={(val: number) => setFuelChoice(val)}
          >
            <ToggleButton variant="secondary" value={2} id="ethanol">
              Ethanol
            </ToggleButton>
            <ToggleButton variant="secondary" value={3} id="average">
              Average
            </ToggleButton>
            <ToggleButton variant="secondary" value={1} id="gas">
              Gas
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Alert
          show={errorWindow}
          variant="danger"
          dismissible
          onClose={() => setErrorWindow(false)}
        >
          {error}
        </Alert>

        <Alert
          show={resultWindow}
          variant="success"
          dismissible
          onClose={() => setResultWindow(false)}
        >
          {result}
        </Alert>

        <Stack direction="horizontal" gap={3}>
          <Button onClick={() => handleResult()}>Calculate</Button>
          <Form.Group controlId="round">
            <Form.Check
              type="switch"
              label="Round result"
              defaultChecked={roundResult}
              checked={roundResult}
              onChange={(e) => setRoundResult(e.target.checked)}
            />
          </Form.Group>
        </Stack>
      </Stack>
    </Container>
  );
};

export default TripPriceCalculator;
