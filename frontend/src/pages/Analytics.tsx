import { useState, useEffect } from 'react';
import { useQRCode } from '../contexts/QRCodeContext';
import { QRCodeHistory } from '../types';
import { QrCode } from 'lucide-react';
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../libs/storageHelper';

const Analytics = () => {
  const { qrHistory, getQRCodeAnalytics } = useQRCode();
  const [selectedQRCode, setSelectedQRCode] = useState<QRCodeHistory | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Select the first QR code by default if available
    if (qrHistory.length > 0 && !selectedQRCode) {
      setSelectedQRCode(qrHistory[0]);
    }
  }, [qrHistory, selectedQRCode]);

  if (qrHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 card animate-fade-in dark:bg-gray-900">
        <QrCode className="h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2 dark:text-gray-400">No QR Codes Found</h2>
        <p className="text-gray-500 text-center max-w-md mb-6 dark:text-gray-400">
          Create and save a QR code in the generator to see analytics here.
        </p>
        <a href="/generator" className="btn btn-primary">
          Create a QR Code
        </a>
      </div>
    );
  }

  const analytics = selectedQRCode ? getQRCodeAnalytics(selectedQRCode.id) : null;

  return (
    <div className="flex flex-col animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* QR Code List */}
        <div className="w-full lg:w-1/4">
          <div className="card mb-6 dark:bg-gray-900 dark:border" >
            <h2 className="text-lg font-semibold mb-4">Your QR Codes</h2>
            <div className="space-y-3 max-h-[600px] overflow-auto pr-2 dark:text-gray-200">
              {qrHistory.map((qrCode) => (
                <button
                  key={qrCode.id}
                  className={`w-full p-3 rounded-lg flex items-center border transition-colors duration-200 dark:bg-gray-900
                    ${
                      selectedQRCode?.id === qrCode.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  onClick={() => setSelectedQRCode(qrCode)}
                >
                  <div 
                    className="h-10 w-10 flex-shrink-0 mr-3 border border-gray-200 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: qrCode.bgColor }}
                  >
                    <QrCode 
                      size={24}
                      className="text-gray-800"
                      style={{ color: qrCode.fgColor }}
                    />
                  </div>
                  <div className="flex-1 text-left overflow-hidden">
                    <div className="font-medium text-sm truncate">
                      {qrCode.value}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(qrCode.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="w-full lg:w-3/4 ">
          {selectedQRCode && analytics ? (
            <AnalyticsDashboard qrCode={selectedQRCode} analytics={analytics} />
          ) : (
            <div className="card flex items-center justify-center h-64">
              <p className="text-gray-500">Select a QR code to view analytics</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;