import { useState, useEffect } from "react";
import {
  Button,
  Container,
  ListGroup,
  Offcanvas,
  Stack,
} from "react-bootstrap";
import CarClass from "../../class/CarClass";
import { Pencil, Trash } from "lucide-react";
import CarCreationScreen from "./CarCreationScreen";
import CarEditScreen from "./CarEditScreen";
import Toolkit from "../../class/Toolkit";
import MyCarsTextContent from "./MyCarsTextContent";

const MyCars = () => {
  const [carList, setCarList] = useState<CarClass[]>([]);
  const [newCarScreen, setNewCarScreen] = useState(false);
  const [showCarDeletionScreen, setShowCarDeletionScreen] = useState(false);
  const [showCarEditScreen, setShowCarEditScreen] = useState(false);
  const [carToBeEdited, setCarToBeEdited] = useState("");
  const [carToBeDeleted, setCarToBeDeleted] = useState("");

  const tools = new Toolkit();
  const userSettings = tools.getCurrentSettings();
  const textContent = new MyCarsTextContent();
  const language = userSettings.language;
  userSettings.read();
  textContent.setLanguage(language);

  useEffect(() => {
    setCarList(tools.getCarList());
    userSettings.read();
    textContent.setLanguage(language);
  }, []);

  const handleNewCarScreen = () => {
    setNewCarScreen(!newCarScreen);
  };

  function handleCarEditScreen(name: string) {
    setCarToBeEdited(name);
    setShowCarEditScreen(!showCarEditScreen);
  }

  function handleCarDeletionScreen(name: string) {
    setCarToBeDeleted(name);
    setShowCarDeletionScreen(!showCarDeletionScreen);
  }

  const handleCarEditScreenNameless = () => {
    setShowCarEditScreen(!showCarEditScreen);
    setCarList(tools.getCarList());
  };

  const handleCarDeletionScreenNameless = () => {
    setShowCarDeletionScreen(!showCarDeletionScreen);
    setCarList(tools.getCarList());
  };

  const handleCarDeletion = () => {
    localStorage.removeItem(carToBeDeleted);
    setShowCarDeletionScreen(false);
    setCarList(tools.getCarList());
  };

  return (
    <Container>
      <Offcanvas
        style={{ paddingTop: "5rem" }}
        show={newCarScreen}
        onHide={handleNewCarScreen}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h1>{textContent.newCar}</h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CarCreationScreen />
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas
        style={{ paddingTop: "5rem" }}
        show={showCarEditScreen}
        onHide={handleCarEditScreenNameless}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h1>{textContent.editCar}</h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CarEditScreen carName={carToBeEdited} />
        </Offcanvas.Body>
      </Offcanvas>
      <Stack gap={3}>
        <h1>{textContent.myCars}</h1>
        <ListGroup>
          {carList.map((car, index) => (
            <ListGroup.Item
              key={index}
              style={{ display: "flex", alignItems: "end" }}
            >
              {car.name}
              <Button
                variant="outline-secondary"
                size="sm"
                style={{ border: "none", marginLeft: ".5rem" }}
                onClick={() => handleCarEditScreen(car.name)}
              >
                <Pencil size={16} />
              </Button>
              <div style={{ marginLeft: "auto" }}>
                <Button
                  size="sm"
                  variant="outline-danger"
                  style={{ border: "none" }}
                  onClick={() => handleCarDeletionScreen(car.name)}
                >
                  <Trash size={16} />
                </Button>
              </div>
            </ListGroup.Item>
          ))}
          <ListGroup.Item>
            +{" "}
            <span
              style={{ textDecoration: "underline" }}
              onClick={handleNewCarScreen}
            >
              {textContent.addCar}
            </span>
          </ListGroup.Item>
        </ListGroup>
        <Offcanvas
          show={showCarDeletionScreen}
          onHide={handleCarDeletionScreenNameless}
          placement="bottom"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{textContent.eraseCar}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <p>
              {textContent.confirmEraseCar} '{carToBeDeleted}'? &nbsp;
              <span style={{ fontWeight: "600" }}>
              {textContent.thisActionUndone}
              </span>
            </p>
            <Stack direction="horizontal" gap={3}>
              <Button variant="outline-danger" onClick={handleCarDeletion}>
              {textContent.eraseCar}
              </Button>
              <Button
                variant="secondary"
                onClick={handleCarDeletionScreenNameless}
              >
                {textContent.cancel}
              </Button>
            </Stack>
          </Offcanvas.Body>
        </Offcanvas>
      </Stack>
    </Container>
  );
};

export default MyCars;
