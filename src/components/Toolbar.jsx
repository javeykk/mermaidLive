import React from 'react';
import { Download, Palette } from 'lucide-react';

const Toolbar = ({ currentTheme, setTheme, themes }) => {
  const handleExport = async () => {
    console.log('Export started...');
    const container = document.getElementById('mermaid-container');
    if (!container) {
      console.error('Container not found');
      alert('错误：找不到图表容器');
      return;
    }

    const svg = container.querySelector('svg');
    if (!svg) {
      console.error('SVG not found');
      alert('错误：找不到SVG图表');
      return;
    }

    try {
      console.log('SVG found, starting export process...');

      // Clone the SVG to avoid modifying the original
      const svgClone = svg.cloneNode(true);
      console.log('SVG cloned');

      // Get dimensions from viewBox or fallback to bbox
      let width, height;
      const viewBox = svgClone.getAttribute('viewBox');
      if (viewBox) {
        [, , width, height] = viewBox.split(' ').map(Number);
        console.log(`Dimensions from viewBox: ${width}x${height}`);
      } else {
        const bbox = svg.getBBox();
        width = bbox.width;
        height = bbox.height;
        svgClone.setAttribute('viewBox', `0 0 ${width} ${height}`);
        console.log(`Dimensions from bbox: ${width}x${height}`);
      }

      if (!width || !height || width <= 0 || height <= 0) {
        throw new Error('Invalid SVG dimensions');
      }

      // Set explicit dimensions
      svgClone.setAttribute('width', width);
      svgClone.setAttribute('height', height);


      // Serialize SVG to string
      const svgString = new XMLSerializer().serializeToString(svgClone);
      console.log('SVG serialized, length:', svgString.length);

      // Convert SVG to data URL (base64) to avoid CORS issues
      const base64 = btoa(unescape(encodeURIComponent(svgString)));
      const dataUrl = `data:image/svg+xml;base64,${base64}`;
      console.log('Data URL created');

      // Create image from SVG
      const img = new Image();
      const scale = 3; // HD export

      img.onload = () => {
        console.log('Image loaded successfully');
        

        try {
          // Create canvas for export
          const canvas = document.createElement('canvas');
          canvas.width = width * scale;
          canvas.height = height * scale;
          console.log(`Canvas created: ${canvas.width}x${canvas.height}`);

          const ctx = canvas.getContext('2d');

          // Fill background color
          const bgColor = themes[currentTheme].variables['--bg-color'];
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          console.log('Background filled with', bgColor);

          // Draw SVG
          ctx.drawImage(img, 0, 0, width * scale, height * scale);
          console.log('SVG drawn to canvas');


          // Export as PNG
          canvas.toBlob((blob) => {
            if (!blob) {
              console.error('Failed to create blob from canvas');
              alert('导出失败：无法生成图像数据');
              return;
            }

            console.log('PNG blob created, size:', blob.size);

            // Generate filename with timestamp
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            const filename = `mermaid-diagram-${timestamp}.png`;

            // Create blob URL for both download and preview
            const blobUrl = URL.createObjectURL(blob);

            // Method 1: Trigger download
            const link = document.createElement('a');
            link.download = filename;
            link.href = blobUrl;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            console.log('Download triggered:', filename);

            // Method 2: Show preview in new window for manual save
            const previewWindow = window.open('', '_blank');
            if (previewWindow) {
              previewWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                  <title>Mermaid Diagram - ${filename}</title>
                  <style>
                    body {
                      margin: 0;
                      padding: 20px;
                      background: #1a1a1a;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      font-family: Arial, sans-serif;
                      color: #fff;
                    }
                    h1 {
                      font-size: 18px;
                      margin-bottom: 10px;
                    }
                    p {
                      color: #aaa;
                      margin-bottom: 20px;
                    }
                    img {
                      max-width: 100%;
                      border: 1px solid #444;
                      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                    }
                  </style>
                </head>
                <body>
                  <h1>📊 导出成功！</h1>
                  <p>右键点击图片 → "图片另存为" 手动保存到桌面</p>
                  <img src="${blobUrl}" alt="Mermaid Diagram" />
                </body>
                </html>
              `);
            } else {
              alert(`导出成功！\n文件名：${filename}\n\n如果下载未自动开始，请检查浏览器是否阻止了弹出窗口。`);
            }

            // Cleanup after delay
            setTimeout(() => {
              URL.revokeObjectURL(blobUrl);
              console.log('Blob URL cleaned up');
            }, 60000); // Keep URL alive for 1 minute for manual save


          }, 'image/png');
        } catch (canvasErr) {
          console.error('Canvas error:', canvasErr);
          alert('导出失败：Canvas处理错误 - ' + canvasErr.message);
        }
      };

      img.onerror = (e) => {
        console.error('Image load error:', e);
        alert('导出失败：无法加载SVG图像。这可能是由于SVG包含不支持的元素。');
      };

      img.src = dataUrl;
      console.log('Image src set (data URL), waiting for load...');

    } catch (err) {
      console.error('Export failed:', err);
      alert('导出失败: ' + err.message);
    }
  };

  return (
    <div className="toolbar" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <div className="theme-selector" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Palette size={16} style={{ position: 'absolute', left: '10px', pointerEvents: 'none', color: 'var(--secondary-color)' }} />
        <select
          className="btn btn-secondary"
          value={currentTheme}
          onChange={(e) => setTheme(e.target.value)}
          style={{ paddingLeft: '2.2rem', appearance: 'none', minWidth: '140px' }}
        >
          {Object.entries(themes).map(([key, theme]) => (
            <option key={key} value={key}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>

      <button className="btn" onClick={handleExport}>
        <Download size={18} />
        Export PNG
      </button>
    </div>
  );
};

export default Toolbar;
