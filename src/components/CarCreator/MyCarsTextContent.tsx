class MyCarsTextContent {
    myCars: string = "";
    addCar: string = "";
    newCar: string = "";
    editCar: string = "";
    eraseCar: string = "";
    confirmEraseCar: string = "";
    thisActionUndone: string = "";
    cancel: string = "";
  
    constructor() {}
  
    setLanguage(language: string): void {
      if (language === "0") {
        this.setLanguageToEnglish();
      } else if (language === "1") {
        this.setLanguageToPortuguese();
      }
    }
  
    setLanguageToEnglish(): void {
      this.myCars = "My Cars";
      this.addCar = "Add Car";
      this.newCar = "New Car";
      this.editCar = "Edit Car";
      this.eraseCar = "Erase Car";
      this.confirmEraseCar = "Are you sure you want to erase this car";
      this.thisActionUndone = "This action cannot be undone.";
      this.cancel = "Cancel";
      
    }
  
    setLanguageToPortuguese(): void {
      this.myCars = "Meus Carros";
      this.addCar = "Adicionar Carro";
      this.newCar = "Novo Carro";
      this.editCar = "Editar Carro";
      this.eraseCar = "Apagar Carro";
      this.confirmEraseCar = "Tem certeza que deseja apagar este carro";
      this.thisActionUndone = "Esta ação não pode ser desfeita.";
      this.cancel = "Cancelar";
    }
  }
  
  export default MyCarsTextContent;
  