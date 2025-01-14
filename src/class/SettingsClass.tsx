class SettingsClass {
  language: string;
  measurementSystem: string;
  theme: string;

  constructor(
    language: string = "0",
    measurementSystem: string = "0",
    theme: string = "0"
  ) {
    this.language = language;
    this.measurementSystem = measurementSystem;
    this.theme = theme;
  }

  store(): void {
    localStorage.setItem("sysSettings", JSON.stringify(this));
  }

  read(): void {
    const settings = localStorage.getItem("sysSettings");
    if (settings) {
      const settingsObject = JSON.parse(settings);
      this.language = settingsObject.language;
      this.measurementSystem = settingsObject.measurementSystem;
      this.theme = settingsObject.theme;
    }
  }

  applyTheme(): void {
    if (this.theme == "1") {
      document.querySelector("body")?.setAttribute("data-bs-theme", "light");
    } else if (this.theme == "2") {
      document.querySelector("body")?.setAttribute("data-bs-theme", "dark");
    } else if (this.theme == "0") {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDarkMode) {
        document.querySelector("body")?.setAttribute("data-bs-theme", "dark");
      } else {
        document.querySelector("body")?.setAttribute("data-bs-theme", "light");
      }
    }
  }
}

export default SettingsClass;
