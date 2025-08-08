import { Globe } from 'lucide-react';
import { LocationData } from '../../types';

interface LocationTableProps {
  locations: LocationData[];
}

const LocationTable = ({ locations }: LocationTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="py-3 px-2 sm:px-4 text-left font-medium text-gray-500 dark:text-gray-400">Country</th>
            <th className="py-3 px-2 sm:px-4 text-right font-medium text-gray-500 dark:text-gray-400">Scans</th>
            <th className="py-3 px-2 sm:px-4 text-right font-medium text-gray-500 dark:text-gray-400">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => (
            <tr 
              key={location.country} 
              className={`${index !== locations.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''} hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
            >
              <td className="py-3 px-2 sm:px-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Globe className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-900 dark:text-white truncate">{location.country}</span>
                </div>
              </td>
              <td className="py-3 px-2 sm:px-4 text-right whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {location.count}
              </td>
              <td className="py-3 px-2 sm:px-4 text-right whitespace-nowrap">
                <div className="flex items-center justify-end">
                  <span className="mr-2 text-gray-900 dark:text-white text-xs sm:text-sm">{location.percentage}%</span>
                  <div className="w-12 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${location.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocationTable;