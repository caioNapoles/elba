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
import Toolkit from "../../class/Toolkit";
import TripPriceCalculatorTextContent from "./TripPriceCalculatorTextContent";
import { text } from "stream/consumers";

const TripPriceCalculator = () => {
  const noCar = new CarClass();
  
  const tools = new Toolkit();
  const userSettings = tools.getCurrentSettings();
  const textContent = new TripPriceCalculatorTextContent();
  const language = userSettings.language;
  userSettings.read();
  textContent.setLanguage(language);

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
    setCarList(tools.getCarList());
    userSettings.read();
    textContent.setLanguage(language);
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
        textContent.costOfTrip + calculateCost().toString();
      setResult(resultMessage);
      setResultWindow(true);
    } catch (error) {
      setError((error as Error).message);

      if ((error as Error).message === "car is undefined") {
        setError(textContent.pleaseSelectACarException);
      }

      setErrorWindow(true);
    }
  };

  const calculateCost = () => {
    const car = currentCar;
    const fuel =
      fuelChoice === 1 ? "gas" : fuelChoice === 2 ? "ethanol" : "average";

    if (car.name == "Select a car") {
      throw new Error(textContent.pleaseSelectACarException);
    } else if (distance === 0 || fuelPrice === 0) {
      throw new Error(textContent.pleaseInputPricesException);
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
          <h1>{textContent.tripCostCalculator}</h1>
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
            <option value="-1">{textContent.selectACar}</option>
            {carList.map((car, index) => (
              <option key={index} value={index}>
                {car.name}
              </option>
            ))}
          </Form.Select>
        </Stack>

        <Form.Group>
          <Form.Label>{textContent.distance}</Form.Label>
          <Form.Control
            type="number"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
          />
        </Form.Group>

        <Stack direction="horizontal" gap={3} style={{ alignItems: "end" }}>
          <Form.Group>
            <Form.Label>{textContent.fuelPrice}</Form.Label>
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
              {textContent.ethanol}
            </ToggleButton>
            <ToggleButton variant="secondary" value={3} id="average">
              {textContent.avarage}
            </ToggleButton>
            <ToggleButton variant="secondary" value={1} id="gas">
              {textContent.gas}
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
          <Button onClick={() => handleResult()}>{textContent.calculate}</Button>
          <Form.Group controlId="round">
            <Form.Check
              type="switch"
              label={textContent.roundResult}
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
