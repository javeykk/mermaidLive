export const themes = {
    dark: {
        name: 'Default Dark',
        type: 'dark',
        variables: {
            '--bg-color': '#0f172a',
            '--text-color': '#e2e8f0',
            '--primary-color': '#38bdf8',
            '--secondary-color': '#64748b',
            '--panel-bg': 'rgba(30, 41, 59, 0.7)',
            '--border-color': 'rgba(148, 163, 184, 0.1)',
            '--glass-border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        mermaid: {
            theme: 'dark',
        }
    },
    light: {
        name: 'Default Light',
        type: 'light',
        variables: {
            '--bg-color': '#f8fafc',
            '--text-color': '#1e293b',
            '--primary-color': '#0ea5e9',
            '--secondary-color': '#64748b',
            '--panel-bg': 'rgba(255, 255, 255, 0.7)',
            '--border-color': 'rgba(203, 213, 225, 0.4)',
            '--glass-border': '1px solid rgba(255, 255, 255, 0.5)',
        },
        mermaid: {
            theme: 'default',
        }
    },
    cyberpunk: {
        name: 'Cyberpunk',
        type: 'dark',
        variables: {
            '--bg-color': '#09090b',
            '--text-color': '#e2e8f0',
            '--primary-color': '#d946ef',
            '--secondary-color': '#22d3ee',
            '--panel-bg': 'rgba(24, 24, 27, 0.8)',
            '--border-color': 'rgba(217, 70, 239, 0.2)',
            '--glass-border': '1px solid rgba(217, 70, 239, 0.3)',
        },
        mermaid: {
            theme: 'dark',
            themeVariables: {
                primaryColor: '#d946ef',
                primaryTextColor: '#fff',
                primaryBorderColor: '#d946ef',
                lineColor: '#22d3ee',
                secondaryColor: '#000000',
                tertiaryColor: '#111111',
            }
        }
    },
    forest: {
        name: 'Forest',
        type: 'dark',
        variables: {
            '--bg-color': '#1a2e1a',
            '--text-color': '#e2e8f0',
            '--primary-color': '#4ade80',
            '--secondary-color': '#166534',
            '--panel-bg': 'rgba(20, 50, 20, 0.7)',
            '--border-color': 'rgba(74, 222, 128, 0.1)',
            '--glass-border': '1px solid rgba(74, 222, 128, 0.2)',
        },
        mermaid: {
            theme: 'base',
            themeVariables: {
                primaryColor: '#22c55e',
                primaryTextColor: '#fff',
                primaryBorderColor: '#4ade80',
                lineColor: '#86efac',
                secondaryColor: '#14532d',
                tertiaryColor: '#1a2e1a',
            }
        }
    },
    ocean: {
        name: 'Ocean',
        type: 'dark',
        variables: {
            '--bg-color': '#0c4a6e',
            '--text-color': '#f0f9ff',
            '--primary-color': '#38bdf8',
            '--secondary-color': '#0369a1',
            '--panel-bg': 'rgba(12, 74, 110, 0.6)',
            '--border-color': 'rgba(56, 189, 248, 0.2)',
            '--glass-border': '1px solid rgba(56, 189, 248, 0.3)',
        },
        mermaid: {
            theme: 'base',
            themeVariables: {
                primaryColor: '#0ea5e9',
                primaryTextColor: '#fff',
                primaryBorderColor: '#7dd3fc',
                lineColor: '#bae6fd',
                secondaryColor: '#075985',
                tertiaryColor: '#0c4a6e',
            }
        }
    },
    sunset: {
        name: 'Sunset',
        type: 'dark',
        variables: {
            '--bg-color': '#4a044e',
            '--text-color': '#fdf4ff',
            '--primary-color': '#f472b6',
            '--secondary-color': '#c026d3',
            '--panel-bg': 'rgba(74, 4, 78, 0.6)',
            '--border-color': 'rgba(244, 114, 182, 0.2)',
            '--glass-border': '1px solid rgba(244, 114, 182, 0.3)',
        },
        mermaid: {
            theme: 'base',
            themeVariables: {
                primaryColor: '#e879f9',
                primaryTextColor: '#fff',
                primaryBorderColor: '#f0abfc',
                lineColor: '#f5d0fe',
                secondaryColor: '#a21caf',
                tertiaryColor: '#4a044e',
            }
        }
    },
    pastel: {
        name: 'Business Pastel',
        type: 'light',
        variables: {
            '--bg-color': '#ffffff',
            '--text-color': '#334155',
            '--primary-color': '#6366f1',
            '--secondary-color': '#94a3b8',
            '--panel-bg': 'rgba(255, 255, 255, 0.8)',
            '--border-color': 'rgba(203, 213, 225, 0.6)',
            '--glass-border': '1px solid rgba(0, 0, 0, 0.05)',
        },
        mermaid: {
            theme: 'base',
            themeVariables: {
                primaryColor: '#e0f2fe',
                primaryTextColor: '#1e293b',
                primaryBorderColor: '#bae6fd',
                lineColor: '#64748b',
                secondaryColor: '#fef9c3',
                tertiaryColor: '#ffffff',
                noteBkgColor: '#fef9c3',
                noteBorderColor: '#fde047',
            }
        }
    }
};
