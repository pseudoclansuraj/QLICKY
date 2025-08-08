import { AnalyticsData, QRCodeHistory } from '../../types';
import { QrCode } from 'lucide-react';
import ScanChart from './ScanChart';
import DeviceBreakdown from './DeviceBreakdown';
import LocationTable from './LocationTable';

interface AnalyticsDashboardProps {
  qrCode: QRCodeHistory;
  analytics: AnalyticsData;
}

const AnalyticsDashboard = ({ qrCode, analytics }: AnalyticsDashboardProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* QR Code Header */}
      <div className="card dark:bg-gray-900 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
          <div className="flex items-center">
            <div 
              className="h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 mr-3 sm:mr-4 border border-gray-200 dark:border-gray-700 rounded-md flex items-center justify-center p-2"
              style={{ backgroundColor: qrCode.bgColor }}
            >
              <QrCode 
                size={window.innerWidth < 640 ? 28 : 40}
                className="text-gray-800"
                style={{ color: qrCode.fgColor }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                {qrCode.value.length > 30 ? `${qrCode.value.substring(0, 30)}...` : qrCode.value}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Created on {new Date(qrCode.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:flex-1">
            <StatCard label="Total Scans" value={analytics.totalScans} />
            <StatCard 
              label="Top Device" 
              value={analytics.deviceBreakdown.sort((a, b) => b.value - a.value)[0].name} 
            />
            <StatCard 
              label="Top Location" 
              value={analytics.topLocations[0].country} 
            />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-2">
          <div className="card h-full dark:bg-gray-900 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-white">Scan Activity</h3>
            <ScanChart data={analytics.scansByDate} />
          </div>
        </div>
        <div>
          <div className="card h-full dark:bg-gray-900 dark:border p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-white">Device Breakdown</h3>
            <DeviceBreakdown data={analytics.deviceBreakdown} />
          </div>
        </div>
      </div>

      {/* Location Table */}
      <div className="card dark:bg-gray-900 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-white">Top Locations</h3>
        <LocationTable locations={analytics.topLocations} />
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 sm:p-3 text-center sm:text-left">
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1 truncate">{label}</p>
      <p className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white truncate">{value}</p>
    </div>
  );
};

export default AnalyticsDashboard;