import { useState } from "react";
import { Button, Form, InputGroup, Alert } from "react-bootstrap";
import CarClass from "../../class/CarClass";


const CarCreationScreen = () => {
  const [carName, setCarName] = useState("");
  const [gasCityConsumption, setGasCityConsumption] = useState(0);
  const [gasHighwayConsumption, setGasHighwayConsumption] = useState(0);
  const [ethanolCityConsumption, setEthanolCityConsumption] = useState(0);
  const [ethanolHighwayConsumption, setEthanolHighwayConsumption] = useState(0);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);

  const handleSubmit = () => {
    try {
      const newCar = new CarClass(
        carName,
        gasHighwayConsumption,
        gasCityConsumption,
        ethanolHighwayConsumption,
        ethanolCityConsumption
      );
      newCar.stringfyAndStore();
      console.log(newCar.name);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred");
      }
      setAlert(true);
    }
  };

  return (
    <div className="screen">
    <div className="carCreation">
      <h1>New Car</h1>
      <Alert
        show={alert}
        variant="danger"
        dismissible
        onClose={() => setAlert(false)}
      >
        {error}
      </Alert>
      <Form>
        <Form.Group className="mb-3" controlId="carName">
          <div className="carName">
          <span className="overTextForm">Car Name</span>

          <Form.Control
            placeholder="Mom's Civic"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
          />
          </div>
        </Form.Group>
        <span className="line"></span>
        <Form.Label className="mt-2">Gas Consumption</Form.Label>

        <div className="input-with-unit">
          <InputGroup className="mt-2">
            
            <span className="overTextForm">City</span>
            <Form.Control
              className="rounded"
              type="number"
              value={gasCityConsumption}
              onChange={(e) => setGasCityConsumption(Number(e.target.value))}
            />
            <span className="unit">km/L</span>
          </InputGroup>
        </div>

        <div className="input-with-unit mt-2">
          <InputGroup className="mt-3">
            <span className="overTextForm">Highway</span>
            
            <Form.Control
              className="rounded"
              type="number"
              value={gasHighwayConsumption}
              onChange={(e) => setGasHighwayConsumption(Number(e.target.value))}
            />
            <span className="unit">km/L</span>
          </InputGroup>
        </div>

        <Form.Label className="mt-3">Ethanol Consumption</Form.Label>
        <div className="input-with-unit">
          <InputGroup className="mt-3">
            <span className="overTextForm">City</span>
            <Form.Control
              className="rounded"
              type="number"
              value={ethanolCityConsumption}
              onChange={(e) => setEthanolCityConsumption(Number(e.target.value))}
            />
            <span className="unit">km/L</span>
          </InputGroup>
        </div>

        <div className="input-with-unit mt-2">
          <InputGroup className="mt-3">
            <span className="overTextForm">Highway</span>
            <Form.Control
              className="rounded"
              type="number"
              value={ethanolHighwayConsumption}
              onChange={(e) => setEthanolHighwayConsumption(Number(e.target.value))}
            />
            <span className="unit">km/L</span>
          </InputGroup>
        </div>
      </Form>
      <Button className="saveBtn" onClick={handleSubmit}>Save Car</Button>
    </div>
    </div>
  );
};

export default CarCreationScreen;
