import CarClass from "./CarClass";
import SettingsClass from "./SettingsClass";

class Toolkit {
  getCarList(): CarClass[] {
    const cars: CarClass[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key !== "sysSettings") {
        const carString = localStorage.getItem(key);
        const car = new CarClass();
        car.readStringToCar(carString || "");
        if (car && car.isCar) {
          cars.push(car);
        }
      }
    }
    return cars;
  }

  getCurrentSettings(): SettingsClass{
    const settings = new SettingsClass();
    settings.read();
    return settings
  }

  refreshPage(){
    window.location.reload();
  }
}

export default Toolkit;
