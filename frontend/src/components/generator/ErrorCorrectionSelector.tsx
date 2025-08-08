interface ErrorCorrectionSelectorProps {
  level: 'L' | 'M' | 'Q' | 'H';
  onChange: (level: 'L' | 'M' | 'Q' | 'H') => void;
}

const ErrorCorrectionSelector = ({ level, onChange }: ErrorCorrectionSelectorProps) => {
  const options = [
    { value: 'L', label: 'Low (7%)' },
    { value: 'M', label: 'Medium (15%)' },
    { value: 'Q', label: 'Quartile (25%)' },
    { value: 'H', label: 'High (30%)' },
  ] as const;

  return (
    <div>
      <div className="text-sm text-gray-600 mb-3 dark:text-gray-400">
        Higher error correction allows QR codes to be readable even when partially obscured or damaged.
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200
              ${
                level === option.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ErrorCorrectionSelector;