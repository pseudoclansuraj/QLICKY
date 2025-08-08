import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { QRCodeProps } from '../../types';

interface CustomQRCodeProps extends Omit<QRCodeProps, 'renderAs'> {
  className?: string;
}

const CustomQRCode: React.FC<CustomQRCodeProps> = ({
  value,
  size,
  fgColor,
  bgColor,
  level,
  includeMargin,
  pattern = 'squares',
  imageSettings,
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    generateCustomQR();
  }, [value, size, fgColor, bgColor, level, includeMargin, pattern, imageSettings]);

  const generateCustomQR = async () => {
    if (!value) return;

    try {
      if (pattern === 'squares' && !imageSettings?.src) {
        // Use canvas for default squares pattern without logo
        const canvas = canvasRef.current;
        if (canvas) {
          await QRCode.toCanvas(canvas, value, {
            errorCorrectionLevel: level,
            margin: includeMargin ? 4 : 0,
            width: size,
            color: {
              dark: fgColor,
              light: bgColor,
            },
          });
        }
      } else {
        // Use SVG for custom patterns or when logo is present
        const qrData = await QRCode.create(value, {
          errorCorrectionLevel: level,
        });
        renderCustomPattern(qrData);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      // Fallback to canvas rendering
      const canvas = canvasRef.current;
      if (canvas) {
        try {
          await QRCode.toCanvas(canvas, value, {
            errorCorrectionLevel: level,
            margin: includeMargin ? 4 : 0,
            width: size,
            color: {
              dark: fgColor,
              light: bgColor,
            },
          });
        } catch (fallbackError) {
          console.error('Fallback canvas rendering failed:', fallbackError);
        }
      }
    }
  };

  const renderCustomPattern = (qrData: any) => {
    const svg = svgRef.current;
    if (!svg) return;

    console.log('Rendering pattern:', pattern, 'QR Data:', qrData);

    // Clear previous content
    svg.innerHTML = '';

    const modules = qrData.modules;
    const moduleCount = modules.size;
    const moduleSize = size / moduleCount;

    console.log('Module count:', moduleCount, 'Module size:', moduleSize);

    // Set SVG attributes
    svg.setAttribute('width', size.toString());
    svg.setAttribute('height', size.toString());
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);

    // Add background
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('width', size.toString());
    background.setAttribute('height', size.toString());
    background.setAttribute('fill', bgColor);
    svg.appendChild(background);

    // Calculate logo area for excavation if logo is present
    let logoArea = null;
    if (imageSettings?.src) {
      const maxLogoSizePercent = getMaxLogoSizeForErrorLevel(level);
      const maxLogoSize = size * maxLogoSizePercent;
      const logoSize = Math.min(imageSettings.width || 60, maxLogoSize);
      const centerX = (size - logoSize) / 2;
      const centerY = (size - logoSize) / 2;
      
      // Convert to module coordinates with reduced padding
      logoArea = {
        startCol: Math.floor((centerX - 2) / moduleSize),
        endCol: Math.ceil((centerX + logoSize + 2) / moduleSize),
        startRow: Math.floor((centerY - 2) / moduleSize),
        endRow: Math.ceil((centerY + logoSize + 2) / moduleSize),
      };
    }

    let elementCount = 0;
    // Render modules based on pattern
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (modules.get(row, col)) {
          // Skip modules that are in the logo area if excavation is enabled
          if (logoArea && imageSettings?.excavate !== false) {
            if (row >= logoArea.startRow && row <= logoArea.endRow &&
                col >= logoArea.startCol && col <= logoArea.endCol) {
              continue;
            }
          }

          const x = col * moduleSize;
          const y = row * moduleSize;
          
          let element;
          
          switch (pattern) {
            case 'dots':
              element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
              element.setAttribute('cx', (x + moduleSize / 2).toString());
              element.setAttribute('cy', (y + moduleSize / 2).toString());
              element.setAttribute('r', (moduleSize * 0.5).toString());
              element.setAttribute('fill', fgColor);
              break;
              
            case 'rounded':
              element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
              element.setAttribute('x', x.toString());
              element.setAttribute('y', y.toString());
              element.setAttribute('width', moduleSize.toString());
              element.setAttribute('height', moduleSize.toString());
              element.setAttribute('rx', (moduleSize * 0.2).toString());
              element.setAttribute('ry', (moduleSize * 0.2).toString());
              element.setAttribute('fill', fgColor);
              break;
              
            case 'classy':
              // Create a more sophisticated pattern for classy style
              const isFinderPattern = isInFinderPattern(row, col, moduleCount);
              if (isFinderPattern) {
                // Use squares for finder patterns
                element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                element.setAttribute('x', x.toString());
                element.setAttribute('y', y.toString());
                element.setAttribute('width', moduleSize.toString());
                element.setAttribute('height', moduleSize.toString());
                element.setAttribute('fill', fgColor);
              } else {
                // Use circles for data modules
                element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                element.setAttribute('cx', (x + moduleSize / 2).toString());
                element.setAttribute('cy', (y + moduleSize / 2).toString());
                element.setAttribute('r', (moduleSize * 0.35).toString());
                element.setAttribute('fill', fgColor);
              }
              break;
              
            default: // squares
              element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
              element.setAttribute('x', x.toString());
              element.setAttribute('y', y.toString());
              element.setAttribute('width', moduleSize.toString());
              element.setAttribute('height', moduleSize.toString());
              element.setAttribute('fill', fgColor);
              break;
          }
          
          if (element) {
            svg.appendChild(element);
            elementCount++;
          }
        }
      }
    }

    console.log('Total elements rendered:', elementCount);

    // Add logo if present
    if (imageSettings?.src) {
      addLogo(svg);
    }
  };

  const isInFinderPattern = (row: number, col: number, moduleCount: number) => {
    // Check if the module is part of a finder pattern (corners)
    const inTopLeft = row < 9 && col < 9;
    const inTopRight = row < 9 && col >= moduleCount - 8;
    const inBottomLeft = row >= moduleCount - 8 && col < 9;
    
    return inTopLeft || inTopRight || inBottomLeft;
  };

  const addLogo = (svg: SVGSVGElement) => {
    if (!imageSettings?.src) return;

    // Adjust logo size based on error correction level for scanability
    const maxLogoSizePercent = getMaxLogoSizeForErrorLevel(level);
    const maxLogoSize = size * maxLogoSizePercent;
    const logoSize = Math.min(imageSettings.width || 60, maxLogoSize);
    
    const centerX = (size - logoSize) / 2;
    const centerY = (size - logoSize) / 2;

    // Create a mask to excavate the logo area
    if (imageSettings.excavate !== false) {
      const logoMask = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      logoMask.setAttribute('x', (centerX - 2).toString());
      logoMask.setAttribute('y', (centerY - 2).toString());
      logoMask.setAttribute('width', (logoSize + 4).toString());
      logoMask.setAttribute('height', (logoSize + 4).toString());
      logoMask.setAttribute('fill', bgColor);
      logoMask.setAttribute('rx', '2');
      svg.appendChild(logoMask);
    }

    // Add a white background for the logo
    const logoBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    logoBg.setAttribute('x', (centerX - 2).toString());
    logoBg.setAttribute('y', (centerY - 2).toString());
    logoBg.setAttribute('width', (logoSize + 4).toString());
    logoBg.setAttribute('height', (logoSize + 4).toString());
    logoBg.setAttribute('fill', 'white');
    logoBg.setAttribute('rx', '2');
    svg.appendChild(logoBg);

    // Add the logo image
    const logoImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    logoImage.setAttribute('x', centerX.toString());
    logoImage.setAttribute('y', centerY.toString());
    logoImage.setAttribute('width', logoSize.toString());
    logoImage.setAttribute('height', logoSize.toString());
    logoImage.setAttribute('href', imageSettings.src);
    svg.appendChild(logoImage);
  };

  const getMaxLogoSizeForErrorLevel = (errorLevel: 'L' | 'M' | 'Q' | 'H'): number => {
    // Maximum logo size as percentage of QR code size based on error correction level
    switch (errorLevel) {
      case 'L': return 0.20; 
      case 'M': return 0.15; 
      case 'Q': return 0.20; 
      case 'H': return 0.30; 
      default: return 0.22;
    }
  };

  return (
    <div className={className}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: pattern === 'squares' && !imageSettings?.src ? 'block' : 'none' 
        }} 
      />
      <svg 
        ref={svgRef} 
        style={{ 
          display: pattern !== 'squares' || imageSettings?.src ? 'block' : 'none' 
        }} 
      />
    </div>
  );
};

export default CustomQRCode;
