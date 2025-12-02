import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import { themes } from './themes';
import './App.css';

const DEFAULT_CODE = `graph TD
    A[Start] --> B{Is it working?}
    B -- Yes --> C[Great!]
    B -- No --> D[Debug]
    D --> B`;

function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    const themeConfig = themes[currentTheme];
    const root = document.documentElement;

    // Apply CSS variables
    Object.entries(themeConfig.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Update data-theme for specific overrides if needed
    root.setAttribute('data-theme', themeConfig.type);
  }, [currentTheme]);

  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <div className="logo">
          <span className="logo-icon">🧜‍♀️</span>
          <h1>Mermaid Live</h1>
        </div>
        <Toolbar
          currentTheme={currentTheme}
          setTheme={setCurrentTheme}
          themes={themes}
        />
      </header>

      <main className="main-content">
        <div className="editor-pane glass-panel">
          <Editor code={code} onChange={setCode} />
        </div>
        <div className="preview-pane glass-panel">
          <Preview
            code={code}
            themeConfig={themes[currentTheme]}
            onCodeChange={setCode}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
