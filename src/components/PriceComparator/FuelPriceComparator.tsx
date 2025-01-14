import { useEffect, useState } from "react";
import { Alert, Button, Container, Form, Stack } from "react-bootstrap";
import CarClass from "../../class/CarClass";
import { Car, CircleHelp } from "lucide-react";

export const FuelPriceComparator = () => {
  const noCar = new CarClass();
  noCar.name = "Select a car";

  const [carList, setCarList] = useState<CarClass[]>([]);
  const [ethanolPrice, setEthanolPrice] = useState<number>(0);
  const [gasPrice, setGasPrice] = useState<number>(0);
  const [roadtripMode, setRoadtripMode] = useState<boolean>(false);
  const [currentCar, setCurrentCar] = useState<CarClass>(noCar);
  const [result, setResult] = useState<string>("");
  const [resultWindow, setResultWindow] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [errorWindow, setErrorWindow] = useState<boolean>(false);

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

  const calculateCost = () => {
    const car = currentCar;
    if (car.name === "Select a car") {
      throw new Error("Please select a car!");
    } else if (ethanolPrice === 0 || gasPrice === 0) {
      throw new Error("Please input the prices!");
    }

    let gasConsumption: number;
    let ethanolConsumption: number;
    if (roadtripMode) {
      gasConsumption = car.gasHighwayConsumption;
      ethanolConsumption = car.ethanolHighwayConsumption;
    } else {
      gasConsumption = car.gasCityConsumption;
      ethanolConsumption = car.ethanolCityConsumption;
    }
    const gasKmCost = gasPrice / gasConsumption;
    console.log("kmCostGas " + gasKmCost);
    const ethanolKmCost = ethanolPrice / ethanolConsumption;
    console.log("kmCostEthanol " + ethanolKmCost);

    if (ethanolKmCost < gasKmCost) {
      return "Ethanol is cheaper!";
    } else {
      return "Gas is cheaper!";
    }
  };

  const handleResult = () => {
    setErrorWindow(false);
    try {
      setResult(calculateCost());
      setResultWindow(true);
    } catch (error) {
      setError((error as Error).message);

      if ((error as Error).message === "car is undefined") {
        setError("Please select a car!");
      }

      setErrorWindow(true);
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
          <h1>Fuel Price Comparator</h1>
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
            <option>Select a car</option>
            {carList.map((car, index) => (
              <option key={index} value={index}>
                {car.name}
              </option>
            ))}
          </Form.Select>
        </Stack>
        <Stack gap={4}>
          <Form.Group>
            <Form.Label>Ethanol Price</Form.Label>
            <Form.Control
              type="number"
              value={ethanolPrice}
              onChange={(e) => setEthanolPrice(Number(e.target.value))}
            />
            <Form.Label>Gas Price</Form.Label>
            <Form.Control
              type="number"
              value={gasPrice}
              onChange={(e) => setGasPrice(Number(e.target.value))}
            />
          </Form.Group>
        </Stack>
        <Alert
          show={resultWindow}
          variant="success"
          dismissible
          onClose={() => setResultWindow(false)}
        >
          {result}
        </Alert>
        <Alert
          show={errorWindow}
          variant="danger"
          dismissible
          onClose={() => setErrorWindow(false)}
        >
          {error}
        </Alert>
        <Stack direction="horizontal" gap={3}>
          <Button onClick={() => handleResult()}>Calculate</Button>
          <Form.Group controlId="roadtripMode">
            <Form.Check
              type="switch"
              label="Roadtrip Mode"
              defaultChecked={roadtripMode}
              checked={roadtripMode}
              onChange={(e) => setRoadtripMode(e.target.checked)}
            />
          </Form.Group>
        </Stack>
      </Stack>
    </Container>
  );
};
