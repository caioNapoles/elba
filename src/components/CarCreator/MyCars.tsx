import { useState, useEffect } from "react";
import { Button, Container, ListGroup, Stack } from "react-bootstrap";
import CarClass from "../../class/CarClass";
import { Pencil, Trash, X } from "lucide-react";
import CarCreationScreen from "./CarCreationScreen";

const MyCars = () => {
  const [carList, setCarList] = useState<CarClass[]>([]);
  const [newCarScreen, setNewCarScreen] = useState(false);

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

  const handleNewCarScreen = () => {
    setNewCarScreen(!newCarScreen);
  };

  if (newCarScreen) {
    return (
      <Stack>
        <Container
          style={{ display: "flex", marginTop: "-3rem", marginBottom: "0" }}
        >
          <Button
            variant="outline-secondary"
            size="sm"
            style={{
              border: "none",
              alignItems: "center",
              marginLeft: "auto",
            }}
            onClick={handleNewCarScreen}
          >
            <X size={32} />
          </Button>
        </Container>
        <CarCreationScreen />
      </Stack>
    );
  }
  return (
    <Container>
      <Stack gap={3}>
        <h1>My Cars</h1>
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
              >
                <Pencil size={16} />
              </Button>
              <div style={{ marginLeft: "auto" }}>
                <Button
                  size="sm"
                  variant="outline-danger"
                  style={{ border: "none" }}
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
              Add Car
            </span>
          </ListGroup.Item>
        </ListGroup>
      </Stack>
    </Container>
  );
};

export default MyCars;
