import React, { useState } from 'react';
import { Box, PaletteMode, Switch, useTheme, styled } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const MaterialUISwitch = styled(Switch)(() => ({
  width: 62,
  height: 40,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    marginTop: 3,
    marginBottom: 3,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    borderRadius: 16,
  },
}));

export const Toggle = ({ onToggle }: { onToggle(): void }) => {
  const theme = useTheme();
  const [themeMode, setThemeMode] = useState<PaletteMode>(theme?.palette?.mode);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: boolean,
  ) => {
    onToggle();
    setThemeMode(value ? 'dark' : 'light');
  };

  return (
    <Box>
      <MaterialUISwitch
        icon={<DarkModeIcon />}
        checkedIcon={<LightModeIcon />}
        checked={themeMode === 'dark'}
        onChange={handleChange}
        color="warning"
      />
    </Box>
  );
};
