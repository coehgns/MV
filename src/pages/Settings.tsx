import React from 'react';
import { Box, Typography, Slider, Switch, FormControlLabel } from '@mui/material';
import styled from '@emotion/styled';
import { useTheme } from '../context/ThemeContext';

const SettingsContainer = styled(Box)`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const SettingSection = styled(Box)`
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background-color: var(--background);
`;

const Settings: React.FC = () => {
  const { theme, toggleTheme, fontSize, setFontSize } = useTheme();

  return (
    <SettingsContainer>
      <Typography variant="h4" gutterBottom>
        설정
      </Typography>
      
      <SettingSection>
        <Typography variant="h6" gutterBottom>
          테마 설정
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={theme === 'dark'}
              onChange={toggleTheme}
              color="primary"
            />
          }
          label={theme === 'dark' ? '다크 모드' : '라이트 모드'}
        />
      </SettingSection>

      <SettingSection>
        <Typography variant="h6" gutterBottom>
          폰트 크기 조절
        </Typography>
        <Box sx={{ px: 2 }}>
          <Slider
            value={fontSize}
            onChange={(_, value) => setFontSize(value as number)}
            min={12}
            max={24}
            step={1}
            marks
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}px`}
          />
        </Box>
      </SettingSection>
    </SettingsContainer>
  );
};

export default Settings; 