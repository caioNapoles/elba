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
    <>
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
          <Form.Label>Car name</Form.Label>
          <Form.Control
            placeholder="Mom's Civic"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
          />
        </Form.Group>

        <Form.Label>Gas Consumption</Form.Label>

        <InputGroup>
          <InputGroup.Text id="inputGroup-sizing-default">City</InputGroup.Text>
          <Form.Control
            type="number"
            value={gasCityConsumption}
            onChange={(e) => setGasCityConsumption(Number(e.target.value))}
          />
          <InputGroup.Text id="inputGroup-sizing-default">
            Highway
          </InputGroup.Text>
          <Form.Control
            type="number"
            value={gasHighwayConsumption}
            onChange={(e) => setGasHighwayConsumption(Number(e.target.value))}
          />
          <InputGroup.Text id="inputGroup-sizing-default">km/L</InputGroup.Text>
        </InputGroup>

        <Form.Label>Ethanol Consumption</Form.Label>
        <InputGroup>
          <InputGroup.Text id="inputGroup-sizing-default">City</InputGroup.Text>
          <Form.Control
            type="number"
            value={ethanolCityConsumption}
            onChange={(e) => setEthanolCityConsumption(Number(e.target.value))}
          />
          <InputGroup.Text id="inputGroup-sizing-default">
            Highway
          </InputGroup.Text>
          <Form.Control
            type="number"
            value={ethanolHighwayConsumption}
            onChange={(e) =>
              setEthanolHighwayConsumption(Number(e.target.value))
            }
          />
          <InputGroup.Text id="inputGroup-sizing-default">km/L</InputGroup.Text>
        </InputGroup>
      </Form>
      <Button onClick={handleSubmit}>Save Car</Button>
    </>
  );
};

export default CarCreationScreen;
