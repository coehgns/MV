import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Global } from '@emotion/react';
import { globalStyles } from './styles/GlobalStyles';
import Layout from './components/Layout';
import Editor from './pages/Editor';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <Global styles={globalStyles} />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Editor />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;