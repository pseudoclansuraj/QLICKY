import { Minus, Plus } from 'lucide-react';

interface SizeSliderProps {
  size: number;
  onChange: (size: number) => void;
}

const SizeSlider = ({ size, onChange }: SizeSliderProps) => {
  const minSize = 100;
  const maxSize = 300;
  const step = 10;

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const decreaseSize = () => {
    if (size > minSize) {
      onChange(size - step);
    }
  };

  const increaseSize = () => {
    if (size < maxSize) {
      onChange(size + step);
    }
  };

  return (
    <div >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">QR Code Size: {size}px</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={decreaseSize}
          disabled={size <= minSize}
          className="p-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          type="range"
          min={minSize}
          max={maxSize}
          step={step}
          value={size}
          onChange={handleSizeChange}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
        />
        <button
          type="button"
          onClick={increaseSize}
          disabled={size >= maxSize}
          className="p-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>Small</span>
        <span>Large</span>
      </div>
    </div>
  );
};

export default SizeSlider;