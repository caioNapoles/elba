class FuelPriceComparatorTextContent {
  fuelPriceCalculator: string = "";
  selectACar: string = "";
  ethanolPrice: string = "";
  gasPrice: string = "";
  calculate: string = "";
  roadtripMode: string = "";
  ethanolCheaper: string = "";
  gasCheaper: string = "";
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
    this.fuelPriceCalculator = "Fuel Price Calculator";
    this.selectACar = "Select a car";
    this.ethanolPrice = "Ethanol price";
    this.gasPrice = "Gas price";
    this.calculate = "Calculate";
    this.roadtripMode = "Roadtrip mode";
    this.ethanolCheaper = "Ethanol is cheaper!";
    this.gasCheaper = "Gas is cheaper!";
    this.pleaseSelectACarException = "Please select a car.";
    this.pleaseInputPricesException = "Please input the prices.";
  }

  setLanguageToPortuguese(): void {
    this.fuelPriceCalculator = "Comparador de Preços de Combustível";
    this.selectACar = "Selecionar carro";
    this.ethanolPrice = "Preço do etanol";
    this.gasPrice = "Preço da gasolina";
    this.calculate = "Calcular";
    this.roadtripMode = "Modo estrada";
    this.ethanolCheaper = "O etanol é mais barato!";
    this.gasCheaper = "A gasolina é mais barata!";
    this.pleaseSelectACarException = "Por favor, selecione um carro.";
    this.pleaseInputPricesException = "Por favor, insira os preços.";
  }
}

export default FuelPriceComparatorTextContent;
