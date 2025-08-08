import { useRef } from 'react';
import { Upload, X, AlertTriangle } from 'lucide-react';
import { ImageSettings } from '../../types';

interface LogoUploaderProps {
  imageSettings: ImageSettings | null;
  onChange: (imageSettings: ImageSettings | null) => void;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

const LogoUploader = ({ imageSettings, onChange, errorCorrectionLevel }: LogoUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const getErrorCorrectionWarning = (level: 'L' | 'M' | 'Q' | 'H') => {
    switch (level) {
      case 'L':
        return {
          message: "Low error correction: Logo will be smaller for better scanning.",
          severity: "warning" as const
        };
      case 'M':
        return {
          message: "Medium error correction: Good balance of logo size and scanning.",
          severity: "info" as const
        };
      case 'Q':
        return {
          message: "Quartile error correction: Larger logos possible with good scanning.",
          severity: "success" as const
        };
      case 'H':
        return {
          message: "High error correction: Optimized logo size for reliable scanning with complex patterns.",
          severity: "info" as const
        };
    }
  };
  

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const newImageSettings: ImageSettings = {
          src: event.target.result as string,
          height: 100,
          width: 100,
          excavate: true,
        };
        onChange(newImageSettings);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    onChange(null);
  };

  return (
    <div>
      {imageSettings ? (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Image Preview</span>
            <button
              type="button"
              onClick={removeLogo}
              className="text-sm text-error-500 hover:text-error-600 flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              Remove
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white border border-gray-200 rounded-md p-2 w-20 h-20 flex items-center justify-center">
              <img 
                src={imageSettings.src} 
                alt="Image" 
                className="max-w-full max-h-full"
              />
            </div>
            {/* <div className="flex-1">
              <div className="text-sm text-gray-600">
                Image size: {imageSettings.width || defaultImageSize}px
              </div>
            </div> */}
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
            Upload Image (Optional)
          </label>
          
          {/* Error Correction Warning */}
          <div className={`mb-3 p-3 rounded-md border-l-4 ${
            getErrorCorrectionWarning(errorCorrectionLevel).severity === 'warning' 
              ? 'bg-yellow-50 border-yellow-400 dark:bg-yellow-900/20' 
              : getErrorCorrectionWarning(errorCorrectionLevel).severity === 'success'
              ? 'bg-green-50 border-green-400 dark:bg-green-900/20'
              : 'bg-blue-50 border-blue-400 dark:bg-blue-900/20'
          }`}>
            <div className="flex items-center">
              <AlertTriangle className={`h-4 w-4 mr-2 ${
                getErrorCorrectionWarning(errorCorrectionLevel).severity === 'warning' 
                  ? 'text-yellow-600' 
                  : getErrorCorrectionWarning(errorCorrectionLevel).severity === 'success'
                  ? 'text-green-600'
                  : 'text-blue-600'
              }`} />
              <p className={`text-sm ${
                getErrorCorrectionWarning(errorCorrectionLevel).severity === 'warning' 
                  ? 'text-yellow-800 dark:text-yellow-200' 
                  : getErrorCorrectionWarning(errorCorrectionLevel).severity === 'success'
                  ? 'text-green-800 dark:text-green-200'
                  : 'text-blue-800 dark:text-blue-200'
              }`}>
                {getErrorCorrectionWarning(errorCorrectionLevel).message}
              </p>
            </div>
          </div>

          <div onClick={handleDivClick} className="border-2 border-dashed border-gray-300 cursor-pointer rounded-md p-6 flex flex-col items-center justify-center hover:border-primary-500 transition-colors duration-200">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-2 ">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400">PNG, JPG up to 1MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className="inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoUploader;