import React, { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Box, Button, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { PictureAsPdf, Download } from '@mui/icons-material';
import html2pdf from 'html2pdf.js';
import styled from '@emotion/styled';
import { useTheme } from '../context/ThemeContext';
import { marked } from 'marked';

const EditorContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  background-color: var(--background);
`;

const EditorSection = styled(Box)`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
  background: var(--background);
`;

const EditorArea = styled(Box)<{ $dark?: boolean }>`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: ${({ $dark }) => $dark ? '#18191c' : '#fff'};
  color: ${({ $dark }) => $dark ? '#fff' : '#222'};
  display: flex;
  flex-direction: column;
  min-height: 500px;
`;

const EditorHeader = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 16px 0 16px;
`;

const PreviewArea = styled(Box)<{ $dark?: boolean }>`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: ${({ $dark }) => $dark ? '#18191c' : '#fff'};
  color: ${({ $dark }) => $dark ? '#fff' : '#222'};
  min-height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledAppBar = styled(AppBar)`
  background-color: var(--background);
  color: var(--text);
  border-bottom: 1px solid var(--border);
`;

const DownloadButton = styled(Button)`
  position: absolute;
  bottom: 24px;
  right: 24px;
  background-color: #2196F3;
  color: white;
  text-transform: none;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(33, 150, 243, 0.15);
  z-index: 10;
  &:hover {
    background-color: #1976D2;
  }
`;

const Editor: React.FC = () => {
  const [value, setValue] = useState(() => {
    const savedContent = localStorage.getItem('markdown-content');
    return savedContent || '';
  });
  const { fontSize, theme } = useTheme();

  useEffect(() => {
    localStorage.setItem('markdown-content', value);
  }, [value]);

  const handleDownload = () => {
    const element = document.createElement('div');
    element.innerHTML = marked.parse(value);
    element.style.fontFamily = "'Noto Sans KR', sans-serif";
    element.style.fontSize = `${fontSize}px`;
    element.style.padding = '20px';
    element.style.lineHeight = '1.6';
    element.style.color = '#000000';
    element.style.backgroundColor = '#ffffff';
    
    const style = document.createElement('style');
    style.textContent = `
      h1, h2, h3, h4, h5, h6 { margin: 1em 0 0.5em; }
      p { margin: 0.5em 0; }
      ul, ol { margin: 0.5em 0; padding-left: 2em; }
      code { background-color: #f5f5f5; padding: 0.2em 0.4em; border-radius: 3px; }
      pre { background-color: #f5f5f5; padding: 1em; border-radius: 5px; overflow-x: auto; }
      blockquote { border-left: 4px solid #ddd; margin: 1em 0; padding-left: 1em; color: #666; }
      table { border-collapse: collapse; width: 100%; margin: 1em 0; }
      th, td { border: 1px solid #ddd; padding: 8px; }
      th { background-color: #f5f5f5; }
    `;
    element.appendChild(style);

    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: 'markdown-document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: true
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait'
      }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <EditorContainer>
      <EditorSection>
        <EditorArea $dark={theme === 'dark'}>
          <MDEditor
            value={value}
            onChange={(val) => setValue(val || '')}
            height="100%"
            style={{
              fontSize: `${fontSize}px`,
              background: theme === 'dark' ? '#18191c' : '#fff',
              color: theme === 'dark' ? '#fff' : '#222',
              border: 'none',
              borderRadius: '8px',
            }}
            theme={theme === 'dark' ? 'dark' : 'light'}
            preview="edit"
          />
        </EditorArea>
        <PreviewArea $dark={theme === 'dark'}>
          <MDEditor.Markdown
            source={value}
            theme={theme === 'dark' ? 'dark' : 'light'}
            style={{
              background: theme === 'dark' ? '#18191c' : '#fff',
              color: theme === 'dark' ? '#fff' : '#222',
              borderRadius: '8px',
              padding: '16px',
              minHeight: '100%',
            }}
          />
          <DownloadButton
            variant="contained"
            startIcon={<Download />}
            onClick={handleDownload}
          >
            PDF 다운로드
          </DownloadButton>
        </PreviewArea>
      </EditorSection>
    </EditorContainer>
  );
};

export default Editor; 