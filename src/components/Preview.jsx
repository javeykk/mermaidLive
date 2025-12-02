import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { TransformWrapper, TransformComponent, useControls } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'Inter, sans-serif',
});

const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
        <div className="preview-controls glass-panel">
            <button className="icon-btn" onClick={() => zoomIn()} title="Zoom In">
                <ZoomIn size={20} />
            </button>
            <button className="icon-btn" onClick={() => zoomOut()} title="Zoom Out">
                <ZoomOut size={20} />
            </button>
            <button className="icon-btn" onClick={() => resetTransform()} title="Reset View">
                <RotateCcw size={20} />
            </button>
        </div>
    );
};

const Preview = ({ code, themeConfig, onCodeChange }) => {
    const [svgContent, setSvgContent] = useState('');
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(null); // { text, originalText, style }

    useEffect(() => {
        // Re-initialize mermaid when theme changes
        if (themeConfig) {
            const config = {
                startOnLoad: false,
                theme: themeConfig.mermaid.theme,
                securityLevel: 'loose',
                fontFamily: 'Inter, sans-serif',
            };
            if (themeConfig.mermaid.themeVariables) {
                config.themeVariables = themeConfig.mermaid.themeVariables;
            }
            mermaid.initialize(config);
        }
    }, [themeConfig]);

    useEffect(() => {
        const renderMermaid = async () => {
            try {
                // We need to generate a unique ID for each render to force re-render if needed,
                // but mermaid.render handles it.
                const { svg } = await mermaid.render('mermaid-svg', code);
                setSvgContent(svg);
                setError(null);
            } catch (err) {
                console.error('Mermaid rendering error:', err);
                setError(err.message || 'Syntax Error');
            }
        };

        // Debounce rendering slightly to avoid flickering on every keystroke
        const timeoutId = setTimeout(() => {
            renderMermaid();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [code, themeConfig]); // Re-render when code OR theme changes

    const handleSvgClick = (e) => {
        // Use elementFromPoint to bypass potential event bubbling issues
        const x = e.clientX;
        const y = e.clientY;
        const target = document.elementFromPoint(x, y);

        // Look for any text-containing element
        const textNode = target?.closest('.nodeLabel, .edgeLabel, .label, p, span, text');

        if (textNode) {
            const text = textNode.textContent.trim();
            if (!text) return;

            setEditing({
                originalText: text,
                currentText: text,
                style: {
                    top: y,
                    left: x,
                }
            });
        }
    };

    const handleEditSubmit = () => {
        if (editing && editing.currentText !== editing.originalText) {
            // Simple replace first occurrence
            // Escape regex special characters in original text
            const escapedOriginal = editing.originalText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const newCode = code.replace(new RegExp(escapedOriginal), editing.currentText);
            onCodeChange(newCode);
        }
        setEditing(null);
    };

    return (
        <div
            id="preview-wrapper"
            className="preview-container"
            style={{ width: '100%', height: '100%', position: 'relative' }}
        >
            {error && (
                <div className="error-toast">
                    ⚠️ {error}
                </div>
            )}

            {editing && (
                <>
                    <div
                        style={{ position: 'fixed', inset: 0, zIndex: 99 }}
                        onClick={() => setEditing(null)}
                    />
                    <div
                        style={{
                            position: 'fixed',
                            zIndex: 100,
                            top: editing.style.top,
                            left: editing.style.left,
                            transform: 'translate(-50%, -100%)', // Position above cursor
                            background: 'var(--panel-bg)',
                            backdropFilter: 'blur(8px)',
                            padding: '8px',
                            borderRadius: '8px',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                            border: 'var(--glass-border)',
                            display: 'flex',
                            gap: '4px',
                            minWidth: '200px',
                        }}
                    >
                        <input
                            autoFocus
                            value={editing.currentText}
                            onChange={(e) => setEditing({ ...editing, currentText: e.target.value })}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleEditSubmit();
                                if (e.key === 'Escape') setEditing(null);
                            }}
                            style={{
                                flex: 1,
                                background: 'rgba(0,0,0,0.1)',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '4px 8px',
                                color: 'var(--text-color)',
                                outline: 'none',
                            }}
                        />
                        <button
                            onClick={handleEditSubmit}
                            className="btn"
                            style={{ padding: '4px 8px', fontSize: '12px' }}
                        >
                            Save
                        </button>
                    </div>
                </>
            )}

            <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={4}
                centerOnInit
                wheel={{ step: 0.1 }}
            >
                <Controls />
                <TransformComponent
                    wrapperStyle={{ width: '100%', height: '100%' }}
                    contentStyle={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <div
                        id="mermaid-container"
                        onClick={handleSvgClick}
                        dangerouslySetInnerHTML={{ __html: svgContent }}
                        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    />
                </TransformComponent>
            </TransformWrapper>

            <style>{`
        .error-toast {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          z-index: 10;
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
          max-width: 80%;
        }
        .preview-controls {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem;
          z-index: 10;
        }
        .icon-btn {
          background: transparent;
          border: none;
          color: var(--text-color);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .icon-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--primary-color);
        }
        /* Ensure SVG scales nicely */
        #mermaid-container svg {
          max-width: 100%;
          max-height: 100%;
          height: auto;
        }
        /* Make text interactive */
        .nodeLabel, .edgeLabel, text {
          cursor: text;
          pointer-events: all; /* Ensure they catch clicks */
        }
        .nodeLabel:hover, .edgeLabel:hover, text:hover {
          text-decoration: underline;
          text-decoration-style: dotted;
          text-decoration-color: var(--primary-color);
        }
      `}</style>
        </div>
    );
};

export default Preview;
