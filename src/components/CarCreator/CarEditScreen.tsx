
import { useEffect, useState } from "react";
import { Form, InputGroup, Alert, Button, Container } from "react-bootstrap";
import CarClass from "../../class/CarClass";
import Toolkit from "../../class/Toolkit"; 
import CarCreationEditTextContent from "./CarCreationEditTextContent";

interface CarEditScreenProps {
  carName: string;
}

const CarEditScreen = (props: CarEditScreenProps) => {
  const [carName, setCarName] = useState(props.carName);
  const [gasCityConsumption, setGasCityConsumption] = useState(0);
  const [gasHighwayConsumption, setGasHighwayConsumption] = useState(0);
  const [ethanolCityConsumption, setEthanolCityConsumption] = useState(0);
  const [ethanolHighwayConsumption, setEthanolHighwayConsumption] = useState(0);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const tools = new Toolkit();
  const userSettings = tools.getCurrentSettings();
  const textContent = new CarCreationEditTextContent();
  const language = userSettings.language;
  userSettings.read();
  textContent.setLanguage(language);

  useEffect(() => {
    buildCarInfo();
    userSettings.read();
    textContent.setLanguage(language);
  }, []);

  const buildCarInfo = () => {
    const car = new CarClass();
    car.getFromName(carName);
    setGasCityConsumption(car.gasCityConsumption);
    setGasHighwayConsumption(car.gasHighwayConsumption);
    setEthanolCityConsumption(car.ethanolCityConsumption);
    setEthanolHighwayConsumption(car.ethanolHighwayConsumption);
  };

  const handleSubmit = () => {
    try {
      const newCar = new CarClass(
        carName,
        gasHighwayConsumption,
        gasCityConsumption,
        ethanolHighwayConsumption,
        ethanolCityConsumption
      );
      newCar.delete();
      newCar.stringfyAndStore();
      console.log(newCar.name);
      setSuccessMessage(
        textContent.success3 + newCar.name + textContent.success4
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
          

          <Form>
            <Form.Group className="mb-3" controlId="carName">
              <div className="carName">
                <span className="overTextForm">{textContent.carName}</span>
                <Form.Control
                  placeholder={textContent.namePlaceholder}
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
                />
              </div>
            </Form.Group>
            <span className="line"></span>
            <Form.Label className="mt-2">{textContent.gasConsupmtion}</Form.Label>
            <div className="input-with-unit">
              <InputGroup className="mt-2">
                <span className="overTextForm">{textContent.city}</span>
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
                <span className="overTextForm">{textContent.highway}</span>

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
            <Form.Label className="mt-3">{textContent.ethanolConsumption}</Form.Label>
            <div className="input-with-unit">
              <InputGroup className="mt-3">
                <span className="overTextForm">{textContent.city}</span>
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
                <span className="overTextForm">{textContent.highway}</span>
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
          {textContent.save}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default CarEditScreen;
