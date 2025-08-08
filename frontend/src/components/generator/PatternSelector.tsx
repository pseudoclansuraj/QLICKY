import { PatternType } from '../../types';

interface PatternSelectorProps {
  selectedPattern: PatternType;
  onChange: (pattern: PatternType) => void;
}

const PatternSelector = ({ selectedPattern, onChange }: PatternSelectorProps) => {
  const patterns: { id: PatternType; name: string }[] = [
    { id: 'squares', name: 'Squares (Default)' },
    { id: 'dots', name: 'Dots' },
    { id: 'rounded', name: 'Rounded' },
    { id: 'classy', name: 'Classy' },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {patterns.map((pattern) => (
          <div
            key={pattern.id}
            className={`
              flex flex-col items-center border rounded-lg p-2 sm:p-3 cursor-pointer transition-all duration-200 dark:bg-gray-900
              ${
                selectedPattern === pattern.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
              }
            `}
            onClick={() => onChange(pattern.id)}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 mb-1 sm:mb-2 flex items-center justify-center">
              {pattern.id === 'squares' && (
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="sm:w-12 sm:h-12">
                  <rect x="8" y="8" width="8" height="8" fill="currentColor" />
                  <rect x="8" y="20" width="8" height="8" fill="currentColor" />
                  <rect x="8" y="32" width="8" height="8" fill="currentColor" />
                  <rect x="20" y="8" width="8" height="8" fill="currentColor" />
                  <rect x="20" y="32" width="8" height="8" fill="currentColor" />
                  <rect x="32" y="8" width="8" height="8" fill="currentColor" />
                  <rect x="32" y="20" width="8" height="8" fill="currentColor" />
                  <rect x="32" y="32" width="8" height="8" fill="currentColor" />
                </svg>
              )}
              {pattern.id === 'dots' && (
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="sm:w-12 sm:h-12">
                  <circle cx="12" cy="12" r="4" fill="currentColor" />
                  <circle cx="12" cy="24" r="4" fill="currentColor" />
                  <circle cx="12" cy="36" r="4" fill="currentColor" />
                  <circle cx="24" cy="12" r="4" fill="currentColor" />
                  <circle cx="24" cy="36" r="4" fill="currentColor" />
                  <circle cx="36" cy="12" r="4" fill="currentColor" />
                  <circle cx="36" cy="24" r="4" fill="currentColor" />
                  <circle cx="36" cy="36" r="4" fill="currentColor" />
                </svg>
              )}
              {pattern.id === 'rounded' && (
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="sm:w-12 sm:h-12">
                  <rect x="8" y="8" width="8" height="8" rx="2" fill="currentColor" />
                  <rect x="8" y="20" width="8" height="8" rx="2" fill="currentColor" />
                  <rect x="8" y="32" width="8" height="8" rx="2" fill="currentColor" />
                  <rect x="20" y="8" width="8" height="8" rx="2" fill="currentColor" />
                  <rect x="20" y="32" width="8" height="8" rx="2" fill="currentColor" />
                  <rect x="32" y="8" width="8" height="8" rx="2" fill="currentColor" />
                  <rect x="32" y="20" width="8" height="8" rx="2" fill="currentColor" />
                  <rect x="32" y="32" width="8" height="8" rx="2" fill="currentColor" />
                </svg>
              )}
              {pattern.id === 'classy' && (
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="sm:w-12 sm:h-12">
                  <path d="M12 8H16V12H12V8Z" fill="currentColor" />
                  <path d="M8 12H12V16H8V12Z" fill="currentColor" />
                  <path d="M8 8H12V12H8V8Z" fill="currentColor" />
                  <path d="M12 32H16V36H12V32Z" fill="currentColor" />
                  <path d="M8 36H12V40H8V36Z" fill="currentColor" />
                  <path d="M8 32H12V36H8V32Z" fill="currentColor" />
                  <path d="M32 8H36V12H32V8Z" fill="currentColor" />
                  <path d="M36 12H40V16H36V12Z" fill="currentColor" />
                  <path d="M36 8H40V12H36V8Z" fill="currentColor" />
                  <path d="M32 32H36V36H32V32Z" fill="currentColor" />
                  <path d="M36 36H40V40H36V36Z" fill="currentColor" />
                  <path d="M36 32H40V36H36V32Z" fill="currentColor" />
                  <rect x="16" y="16" width="16" height="16" fill="currentColor" />
                </svg>
              )}
            </div>
            <span className="text-xs sm:text-sm font-medium text-center leading-tight">
              {pattern.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatternSelector;