import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Stack,
} from "react-bootstrap";
import Car from "../../class/Car";

export const FuelPriceComparator = () => {
  const noCar = new Car();
  noCar.name = "Select a car";

  const [carList, setCarList] = useState<Car[]>([]);
  const [ethanolPrice, setEthanolPrice] = useState<number>(0);
  const [gasPrice, setGasPrice] = useState<number>(0);
  const [roadtripMode, setRoadtripMode] = useState<boolean>(false);
  const [currentCar, setCurrentCar] = useState<Car>(noCar);
  const [result, setResult] = useState<string>("");
  const [resultWindow, setResultWindow] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [errorWindow, setErrorWindow] = useState<boolean>(false);

  useEffect(() => {
    const cars: Car[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const carString = localStorage.getItem(key);
        const car = new Car();
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
      setErrorWindow(true);
    }
  };

  return (
    <div>
      <Container>
        <Stack gap={3}>
          <h1>Fuel Price Comparator</h1>
          <Stack direction="horizontal" gap={3}>
            <h4>Current car:</h4>
            <DropdownButton
              id="dropdown-variants-secondary"
              title={currentCar.name || "Select a car"}
              variant="secondary"
              onSelect={handleSelect}
            >
              {carList.map((car, index) => (
                <Dropdown.Item key={index} eventKey={index.toString()}>
                  {car.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Stack>
          <Form.Group controlId="ethanolPrice">
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
    </div>
  );
};
