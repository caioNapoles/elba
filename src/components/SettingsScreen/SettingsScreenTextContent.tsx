class SettingsScreenTextContent {
  settings: string = "";

  language: string = "";
  portuguese: string = "🇧🇷 Português Brasileiro";
  english: string = "🇺🇸 English";

  measurementSystem: string = "";
  imperial: string = "";
  metric: string = "";

  theme: string = "";
  dark: string = "";
  light: string = "";
  useSystemSettings: string = "";

  constructor() {}

  setLanguage(language: string): void {
    if (language === "0") {
      this.setLanguageToEnglish();
    } else if (language === "1") {
      this.setLanguageToPortuguese();
    }
  }

  setLanguageToEnglish() {
    this.settings = "Settings";

    this.language = "Language";

    this.measurementSystem = "Measurement System";
    this.imperial = "Imperial (MPG)";
    this.metric = "Metric (km/L)";

    this.theme = "Theme";
    this.dark = "Dark";
    this.light = "Light";
    this.useSystemSettings = "Follow system settings";
  }

  setLanguageToPortuguese() {
    this.settings = "Preferências";

    this.language = "Idioma";

    this.measurementSystem = "Sistema de Medidas";
    this.imperial = "Imperial (MPG)";
    this.metric = "Métrico (km/L)";

    this.theme = "Tema";
    this.dark = "Escuro";
    this.light = "Claro";
    this.useSystemSettings = "Seguir configurações do sistema";
  }
}

export default SettingsScreenTextContent;