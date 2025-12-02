import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, onChange }) => {
    const handleEditorChange = (value) => {
        onChange(value);
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Editor
                height="100%"
                defaultLanguage="mermaid"
                value={code}
                theme="vs-dark"
                onChange={handleEditorChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    fontFamily: "'Fira Code', 'Consolas', monospace",
                    padding: { top: 16, bottom: 16 },
                }}
            />
        </div>
    );
};

export default CodeEditor;
