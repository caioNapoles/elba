class TripPriceCalculatorTextContent {
    tripCostCalculator: string = "";
    selectACar: string = "";
    fuelPrice: string = "";
    distance: string = "";
    calculate: string = "";
    roundResult: string = "";
    costOfTrip: string = "";
    ethanol: string = "";
    avarage: string = "";
    gas: string = "";
    pleaseSelectACarException: string = "";
    pleaseInputPricesException: string = "";
  
    constructor() {}
  
    setLanguage(language: string): void {
      if (language === "0") {
        this.setLanguageToEnglish();
      } else if (language === "1") {
        this.setLanguageToPortuguese();
      }
    }
  
    setLanguageToEnglish(): void {
      this.tripCostCalculator = "Trip Cost Calculator";
      this.selectACar = "Select a car";
      this.fuelPrice = "Fuel price";
      this.distance = "Distance";
      this.calculate = "Calculate";
      this.roundResult = "Round result";
      this.costOfTrip = "The cost of the trip is: $ ";
      this.ethanol = "Ethanol";
      this.avarage = "Average";
      this.gas = "Gas";
      this.pleaseSelectACarException = "Please select a car.";
      this.pleaseInputPricesException = "Please input the distance and price!";
    }
  
    setLanguageToPortuguese(): void {
      this.tripCostCalculator = "Calculadora de custo de viagem";
      this.selectACar = "Selecione um carro";
      this.fuelPrice = "Preço do combustível";
      this.distance = "Distância";
      this.calculate = "Calcular";
      this.roundResult = "Arredondar resultado";
      this.costOfTrip = "O custo da viagem é: R$ ";
      this.ethanol = "Etanol";
      this.avarage = "Média";
      this.gas = "Gasolina";
      this.pleaseSelectACarException = "Por favor, selecione um carro.";
      this.pleaseInputPricesException = "Por favor, insira a distância e o preço!";
    }
  }
  
  export default TripPriceCalculatorTextContent;
  