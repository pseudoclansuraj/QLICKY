import { useState, useRef, useEffect } from 'react';
import { Paintbrush } from 'lucide-react';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker = ({ label, color, onChange }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const presetColors = [
    '#000000', '#FFFFFF', '#FF006E', '#3A86FF', '#8338EC', 
    '#FB5607', '#FFBE0B', '#10B981', '#3B82F6', '#6B7280',
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handlePresetClick = (presetColor: string) => {
    onChange(presetColor);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={colorPickerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">{label}</label>
      <div className="flex items-center">
        <div 
          className="w-10 h-10 rounded-md border border-gray-300 mr-3 cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className="flex-1">
          <div 
            className="input-field flex items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex-1">{color}</span>
            <Paintbrush className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 p-3 bg-white rounded-lg shadow-lg border border-gray-200 w-full animate-fade-in">
          <div className="mb-3">
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-full h-8 cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {presetColors.map((presetColor) => (
              <div
                key={presetColor}
                className="w-6 h-6 rounded-md cursor-pointer border border-gray-200"
                style={{ backgroundColor: presetColor }}
                onClick={() => handlePresetClick(presetColor)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;