import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { QRCodeProps, QRCodeHistory, AnalyticsData } from '../types';
import { generateMockAnalytics } from '../utils/mockData';

// Default QR code settings
const defaultQRCode: QRCodeProps = {
  value: 'https://example.com',
  size: 200,
  fgColor: '#000000',
  bgColor: '#FFFFFF',
  level: 'M',
  includeMargin: true,
  renderAs: 'svg',
  imageSettings: null,
  pattern: 'squares',
};

interface QRCodeContextType {
  currentQR: QRCodeProps;
  qrHistory: QRCodeHistory[];
  analyticsData: AnalyticsData | null;
  updateQRCode: (updates: Partial<QRCodeProps>) => void;
  resetQRCode: () => void;
  saveQRCode: () => void;
  getQRCodeAnalytics: (id: string) => AnalyticsData | null;
}

const QRCodeContext = createContext<QRCodeContextType | undefined>(undefined);

export function QRCodeProvider({ children }: { children: React.ReactNode }) {
  const [currentQR, setCurrentQR] = useState<QRCodeProps>(defaultQRCode);
  const [qrHistory, setQRHistory] = useState<QRCodeHistory[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  // Load saved QR codes from local storage
  useEffect(() => {
    const savedHistory = localStorage.getItem('qrHistory');
    if (savedHistory) {
      try {
        setQRHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading saved QR codes', error);
      }
    }
  }, []);

  // Save QR history to local storage when it changes
  useEffect(() => {
    if (qrHistory.length > 0) {
      localStorage.setItem('qrHistory', JSON.stringify(qrHistory));
    }
  }, [qrHistory]);

  const updateQRCode = (updates: Partial<QRCodeProps>) => {
    setCurrentQR((prev) => ({ ...prev, ...updates }));
  };

  const resetQRCode = () => {
    setCurrentQR(defaultQRCode);
  };

  const saveQRCode = () => {
    const newQRCode: QRCodeHistory = {
      id: uuidv4(),
      ...currentQR,
      createdAt: new Date().toISOString(),
    };
    
    setQRHistory((prev) => [newQRCode, ...prev]);
    
    // Generate mock analytics data for the new QR code
    const mockAnalytics = generateMockAnalytics(newQRCode.id);
    setAnalyticsData(mockAnalytics);
  };

  const getQRCodeAnalytics = (id: string) => {
    return generateMockAnalytics(id);
  };

  return (
    <QRCodeContext.Provider
      value={{
        currentQR,
        qrHistory,
        analyticsData,
        updateQRCode,
        resetQRCode,
        saveQRCode,
        getQRCodeAnalytics,
      }}
    >
      {children}
    </QRCodeContext.Provider>
  );
}

export function useQRCode() {
  const context = useContext(QRCodeContext);
  if (context === undefined) {
    throw new Error('useQRCode must be used within a QRCodeProvider');
  }
  return context;
}