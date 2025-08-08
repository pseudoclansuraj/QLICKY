import { AnalyticsData, ScanData, DeviceData, LocationData } from '../types';

// Generate random number within range
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate dates for the last 30 days
const generateDates = (days: number): string[] => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
};

// Generate scan data for each date
const generateScanData = (dates: string[]): ScanData[] => {
  return dates.map(date => ({
    date,
    count: randomInt(5, 50)
  }));
};

// Generate device breakdown data
const generateDeviceData = (): DeviceData[] => {
  const mobilePercentage = randomInt(40, 70);
  const desktopPercentage = randomInt(20, 40);
  const tabletPercentage = 100 - mobilePercentage - desktopPercentage;
  
  return [
    { name: 'Mobile', value: mobilePercentage },
    { name: 'Desktop', value: desktopPercentage },
    { name: 'Tablet', value: tabletPercentage }
  ];
};

// Generate location data
const generateLocationData = (): LocationData[] => {
  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Germany', 
    'France', 'Australia', 'Japan', 'India', 'Brazil', 'Mexico'
  ];
  
  let remainingPercentage = 100;
  const locations: LocationData[] = [];
  
  // Generate top 5 countries
  for (let i = 0; i < 5; i++) {
    const country = countries[i];
    let percentage: number;
    
    if (i === 4) {
      percentage = remainingPercentage;
    } else {
      percentage = i === 0 
        ? randomInt(20, 40) 
        : randomInt(5, Math.min(25, remainingPercentage - 5));
    }
    
    remainingPercentage -= percentage;
    
    locations.push({
      country,
      count: Math.round(percentage * 2), // Just a way to get a reasonable count
      percentage
    });
  }
  
  return locations;
};

// Calculate total scans from scan data
const calculateTotalScans = (scanData: ScanData[]): number => {
  return scanData.reduce((total, item) => total + item.count, 0);
};

// Generate complete analytics data
export const generateMockAnalytics = (id: string): AnalyticsData => {
  const dates = generateDates(30);
  const scansByDate = generateScanData(dates);
  const deviceBreakdown = generateDeviceData();
  const topLocations = generateLocationData();
  const totalScans = calculateTotalScans(scansByDate);
  
  return {
    id,
    totalScans,
    scansByDate,
    deviceBreakdown,
    topLocations
  };
};