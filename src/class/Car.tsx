class Car {
  name: string;
  gasHighwayConsumption: number;
  gasCityConsumption: number;
  ethanolHighwayConsumption: number;
  ethanolCityConsumption: number;

  constructor(
    name: string = "",
    gasHighwayConsumption: number = 0,
    gasCityConsumption: number = 0,
    ethanolHighwayConsumption: number = 0,
    ethanolCityConsumption: number = 0
  ) {
    this.name = name;
    this.gasHighwayConsumption = gasHighwayConsumption;
    this.gasCityConsumption = gasCityConsumption;
    this.ethanolHighwayConsumption = ethanolHighwayConsumption;
    this.ethanolCityConsumption = ethanolCityConsumption;
  }

  stringfy() {
    return JSON.stringify(this);
  }

  readStringToCar(string: string) {
    const car = JSON.parse(string);
    this.name = car.name;
    this.gasHighwayConsumption = car.gasHighwayConsumption;
    this.gasCityConsumption = car.gasCityConsumption;
    this.ethanolHighwayConsumption = car.ethanolHighwayConsumption;
    this.ethanolCityConsumption = car.ethanolCityConsumption;
  }

  stringfyAndStore() {
    if (this.checkItemInLocalStorage(this.name)) {
      throw new Error(
        "You already have a car with this name! Please choose another name."
      );
    } else if (this.checkForEmptyValues()) {
      throw new Error("None of the values can be empty!");
    } else {
      const item = this.stringfy();
      localStorage.setItem(this.name, item);
    }
  }

  checkItemInLocalStorage = (key: string) => {
    const item = localStorage.getItem(key);
    if (item) {
      return true;
    } else {
      return false;
    }
  };

  checkForEmptyValues() {
    if (
      this.name === "" ||
      this.gasCityConsumption === 0 ||
      this.gasHighwayConsumption === 0 ||
      this.ethanolCityConsumption === 0 ||
      this.ethanolHighwayConsumption === 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export default Car;
