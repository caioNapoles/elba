import { useEffect, useState } from "react";
import { Stack, Form, Container } from "react-bootstrap";
import SettingsClass from "../../class/SettingsClass";
import SettingsScreenTextContent from "./SettingsScreenTextContent";

export const SettingsScreen = () => {
  const [language, setLanguage] = useState("");
  const [system, setSystem] = useState("");
  const [theme, setTheme] = useState("");
  const [userSettings, setUserSettings] = useState(
    new SettingsClass(language, system, theme)
  );

  const textContent = new SettingsScreenTextContent();
  textContent.setLanguage(language);

  useEffect(() => {
    userSettings.read();
    setLanguage(userSettings.language);
    setSystem(userSettings.measurementSystem);
    setTheme(userSettings.theme);
    userSettings.applyTheme();
  });

  function handleTheme(value: string) {
    setTheme(value);
    const newSettings = new SettingsClass(language, system, value);
    newSettings.store();
    setUserSettings(newSettings);
  }

  function handleSystem(value: string) {
    setSystem(value);
    const newSettings = new SettingsClass(language, value, theme);
    newSettings.store();
    setUserSettings(newSettings);
  }

  function handleLanguage(value: string) {
    setLanguage(value);
    const newSettings = new SettingsClass(value, system, theme);
    newSettings.store();
    setUserSettings(newSettings);
  }

  return (
    <Container>
      <Stack gap={3}>
        <h1>{textContent.settings}</h1>
        <Stack direction="horizontal" gap={3}>
          <Form.Label>{textContent.language}</Form.Label>
          <Form.Select
            value={language}
            onChange={(e) => handleLanguage(e.target.value)}
          >
            <option value="0">🇺🇸 English</option>
            <option value="1">🇧🇷 Português Brasileiro</option>
          </Form.Select>
        </Stack>

        <Stack direction="horizontal" gap={3}>
          <Form.Label>{textContent.measurementSystem}</Form.Label>
          <Form.Select
            value={system}
            onChange={(e) => handleSystem(e.target.value)}
          >
            <option value="0">{textContent.metric}</option>
            <option value="1">{textContent.imperial}</option>
          </Form.Select>
        </Stack>

        <Stack direction="horizontal" gap={3}>
          <Form.Label>{textContent.theme}</Form.Label>
          <Form.Select
            value={theme}
            onChange={(e) => handleTheme(e.target.value)}
          >
            <option value="0">{textContent.useSystemSettings}</option>
            <option value="1">{textContent.light}</option>
            <option value="2">{textContent.dark}</option>
          </Form.Select>
        </Stack>
      </Stack>
    </Container>
  );
};

export default SettingsScreen;
