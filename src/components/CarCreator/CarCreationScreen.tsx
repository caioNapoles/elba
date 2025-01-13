import { useState } from "react";
import { Button, Form, InputGroup, Alert, Container } from "react-bootstrap";
import CarClass from "../../class/CarClass";
import "./CarCreationScreen.css";

const CarCreationScreen = () => {
  const [carName, setCarName] = useState("");
  const [gasCityConsumption, setGasCityConsumption] = useState(0);
  const [gasHighwayConsumption, setGasHighwayConsumption] = useState(0);
  const [ethanolCityConsumption, setEthanolCityConsumption] = useState(0);
  const [ethanolHighwayConsumption, setEthanolHighwayConsumption] = useState(0);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
      setSuccessMessage(
        "Registered the car '" + newCar.name + "' successfully!"
      );
      setSuccess(true);
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
    <Container>
      <div className="screen">
        <div className="carCreation">
          <h1>New Car</h1>

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
                  placeholder="0"
                  type="number"
                  value={gasCityConsumption}
                  onChange={(e) =>
                    setGasCityConsumption(Number(e.target.value))
                  }
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
                  onChange={(e) =>
                    setGasHighwayConsumption(Number(e.target.value))
                  }
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
                  onChange={(e) =>
                    setEthanolCityConsumption(Number(e.target.value))
                  }
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
                  onChange={(e) =>
                    setEthanolHighwayConsumption(Number(e.target.value))
                  }
                />
                <span className="unit">km/L</span>
              </InputGroup>
            </div>
          </Form>

          <Alert
            show={alert}
            variant="danger"
            dismissible
            onClose={() => setAlert(false)}
            style={{ marginTop: "1rem", marginBottom: "-1rem", width: "100%" }}
          >
            {error}
          </Alert>

          <Alert
            show={success}
            variant="success"
            dismissible
            onClose={() => setSuccess(false)}
            style={{ marginTop: "1rem", marginBottom: "-1rem", width: "100%" }}
          >
            {successMessage}
          </Alert>

          <Button className="saveBtn" onClick={handleSubmit}>
            Save Car
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default CarCreationScreen;
