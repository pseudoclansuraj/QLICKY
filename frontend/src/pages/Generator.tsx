import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../libs/storageHelper';
import { Download, RefreshCcw, Save } from 'lucide-react';
import { useQRCode } from '../contexts/QRCodeContext';
import ColorPicker from '../components/generator/ColorPicker';
import SizeSlider from '../components/generator/SizeSlider';
import LogoUploader from '../components/generator/LogoUploader';
import PatternSelector from '../components/generator/PatternSelector';
import ErrorCorrectionSelector from '../components/generator/ErrorCorrectionSelector';
import CustomQRCode from '../components/generator/CustomQRCode';

const Generator = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    }
  }, [navigate]);

  const { currentQR, updateQRCode, resetQRCode, saveQRCode } = useQRCode();
  const [url, setUrl] = useState(currentQR.value);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleURLSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateQRCode({ value: url });
  };

  const downloadQRCode = (format: 'svg' | 'png') => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector('svg');
    const canvas = qrRef.current.querySelector('canvas');
    
    if (format === 'svg') {
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = 'qrcode.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgUrl);
      } else if (canvas) {
        // Convert canvas to SVG for download
        const tempCanvas = document.createElement('canvas');
        const ctx = tempCanvas.getContext('2d');
        tempCanvas.width = currentQR.size;
        tempCanvas.height = currentQR.size;
        ctx?.drawImage(canvas, 0, 0);
        
        const dataUrl = tempCanvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = dataUrl;
        downloadLink.download = 'qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    } else if (format === 'png') {
      if (canvas) {
        // Direct canvas download
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else if (svg) {
        // Convert SVG to PNG
        const tempCanvas = document.createElement('canvas');
        const ctx = tempCanvas.getContext('2d');
        const img = new Image();
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);

        img.onload = () => {
          tempCanvas.width = currentQR.size;
          tempCanvas.height = currentQR.size;
          ctx?.drawImage(img, 0, 0);

          const pngUrl = tempCanvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.href = pngUrl;
          downloadLink.download = 'qrcode.png';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(svgUrl);
        };

        img.src = svgUrl;
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 animate-fade-in">
        {/* QR Code Preview */}
        <div className="w-full xl:w-1/2 flex flex-col items-center xl:sticky xl:top-24 self-start order-2 xl:order-1">
          <div className="card w-full max-w-lg flex flex-col items-center p-4 sm:p-6 lg:p-8 dark:bg-gray-900 dark:border">
            <h2 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
              QR Code Preview
            </h2>
            <div
              ref={qrRef}
              className="p-3 sm:p-4 rounded-lg border border-gray-200 bg-white shadow-inner mx-auto"
              style={{ backgroundColor: currentQR.bgColor }}
            >
              <CustomQRCode
                value={currentQR.value}
                size={currentQR.size}
                fgColor={currentQR.fgColor}
                bgColor={currentQR.bgColor}
                level={currentQR.level}
                includeMargin={currentQR.includeMargin}
                pattern={currentQR.pattern}
                imageSettings={currentQR.imageSettings}
              />
            </div>
            <div className="mt-4 sm:mt-6 w-full">
              <form onSubmit={handleURLSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center mb-4">
                <input
                  type="text"
                  value={url}
                  onChange={handleURLChange}
                  placeholder="Enter URL to encode"
                  className="input-field flex-1 dark:text-white text-sm sm:text-base"
                />
                <button
                  type="submit"
                  className="sm:ml-2 btn btn-primary text-sm sm:text-base"
                >
                  Update
                </button>
              </form>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 justify-center mt-4 sm:mt-6">
                <button
                  onClick={() => downloadQRCode('svg')}
                  className="btn btn-outline flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Download</span> SVG
                </button>
                <button
                  onClick={() => downloadQRCode('png')}
                  className="btn btn-outline flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Download</span> PNG
                </button>
                <button
                  onClick={saveQRCode}
                  className="btn btn-secondary flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  <Save className="h-3 w-3 sm:h-4 sm:w-4" />
                  Save
                </button>
                <button
                  onClick={resetQRCode}
                  className="btn btn-outline flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-error-500 border-error-500 hover:bg-error-50"
                >
                  <RefreshCcw className="h-3 w-3 sm:h-4 sm:w-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Customization Options */}
        <div className="w-full xl:w-1/2 order-1 xl:order-2">
          <div className="card w-full dark:bg-gray-900 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
              Customize Your QR Code
            </h2>
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-900 dark:text-white">Colors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <ColorPicker
                    label="Foreground Color"
                    color={currentQR.fgColor}
                    onChange={(color) => updateQRCode({ fgColor: color })}
                  />
                  <ColorPicker
                    label="Background Color"
                    color={currentQR.bgColor}
                    onChange={(color) => updateQRCode({ bgColor: color })}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-900 dark:text-white">Pattern & Style</h3>
                <PatternSelector
                  selectedPattern={currentQR.pattern || 'squares'}
                  onChange={(pattern) => updateQRCode({ pattern })}
                />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-900 dark:text-white">Size</h3>
                <SizeSlider
                  size={currentQR.size}
                  onChange={(size) => updateQRCode({ size })}
                />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-900 dark:text-white">Logo</h3>
                <LogoUploader
                  imageSettings={currentQR.imageSettings}
                  onChange={(imageSettings) => updateQRCode({
                    imageSettings,
                    renderAs: 'canvas' 
                  })}
                  errorCorrectionLevel={currentQR.level}
                />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-900 dark:text-white">Error Correction</h3>
                <ErrorCorrectionSelector
                  level={currentQR.level}
                  onChange={(level) => updateQRCode({ level })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
