class CarCreationEditTextContent {
    carName: string = "";
    gasConsupmtion: string = "";
    ethanolConsumption: string = "";
    city: string = "";
    highway: string = "";
    save: string = "";
    namePlaceholder: string = "";
    success1: string = "";
    success2: string = "";
    success3: string = "";
    success4: string = "";
    
  
    constructor() {}
  
    setLanguage(language: string): void {
      if (language === "0") {
        this.setLanguageToEnglish();
      } else if (language === "1") {
        this.setLanguageToPortuguese();
      }
    }
  
    setLanguageToEnglish(): void {
      this.carName = "Car Name";
      this.gasConsupmtion = "Gas Consumption";
      this.ethanolConsumption = "Ethanol Consumption";
      this.city = "City";
      this.highway = "Highway";
      this.save = "Save";
      this.namePlaceholder = "Mom's Civic";
      this.success1 = "Registered the car '";
      this.success2 = "' successfully!";
      this.success3 = "Edited the car '";
      this.success4 = "' successfully!";
    }
  
    setLanguageToPortuguese(): void {
      this.carName = "Nome do Carro";
      this.gasConsupmtion = "Consumo de Gasolina";
      this.ethanolConsumption = "Consumo de Etanol";
      this.city = "Cidade";
      this.highway = "Estrada";
      this.save = "Salvar"
      this.namePlaceholder = "Civic da Mamãe";
      this.success1 = "Carro '";
      this.success2 = "' registrado com successo!";
      this.success3 = "Carro '";
      this.success4 = "' editado com successo!";
    }
  }
  
  export default CarCreationEditTextContent;
  