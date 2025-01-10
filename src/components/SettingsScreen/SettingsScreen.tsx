import React, { useState } from "react";
import { Stack, Form, Container } from "react-bootstrap";

export const SettingsScreen = () => {
  const [language, setLanguage] = useState("1");
  const [system, setSystem] = useState("1");
  const [theme, setTheme] = useState("0");

  return (
    <Container>
      <Stack gap={3}>
        <h1>Settings</h1>
        <Stack direction="horizontal" gap={3}>
          <Form.Label>Language</Form.Label>
          <Form.Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="1">🇺🇸 English</option>
            <option value="2">🇧🇷 Português Brasileiro</option>
          </Form.Select>
        </Stack>

        <Stack direction="horizontal" gap={3}>
          <Form.Label>Measurement System</Form.Label>
          <Form.Select
            value={system}
            onChange={(e) => setSystem(e.target.value)}
          >
            <option value="1">Metric (km/L)</option>
            <option value="2">Imperial (MPG)</option>
          </Form.Select>
        </Stack>

        <Stack direction="horizontal" gap={3}>
          <Form.Label>Theme</Form.Label>
          <Form.Select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="0">Follow system settings</option>
            <option value="1">Light</option>
            <option value="2">Dark</option>
            <option value="3">Darker (OLED)</option>
          </Form.Select>
        </Stack>
      </Stack>
    </Container>
  );
};

export default SettingsScreen;
