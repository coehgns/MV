import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7, Settings } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledAppBar = styled(AppBar)`
  background-color: var(--background);
  color: var(--text);
  border-bottom: 1px solid var(--border);
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            MarkView
          </Typography>
          <Box>
            <IconButton onClick={toggleTheme} color="inherit">
              {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <IconButton onClick={() => navigate('/settings')} color="inherit">
              <Settings />
            </IconButton>
          </Box>
        </StyledToolbar>
      </StyledAppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 