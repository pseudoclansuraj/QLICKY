// QR Code Types
export interface QRCodeProps {
  value: string;
  size: number;
  fgColor: string;
  bgColor: string;
  level: "L" | "M" | "Q" | "H";
  includeMargin: boolean;
  renderAs: "svg" | "canvas";
  imageSettings: ImageSettings | null;
  pattern?: "squares" | "dots" | "rounded" | "classy";
}

export interface ImageSettings {
  src: string;
  x?: number;
  y?: number;
  height?: number;
  width?: number;
  excavate?: boolean;
}

export interface QRCodeHistory extends QRCodeProps {
  id: string;
  createdAt: string;
}

// Analytics Types
export interface ScanData {
  date: string;
  count: number;
}

export interface DeviceData {
  name: string;
  value: number;
}

export interface LocationData {
  country: string;
  count: number;
  percentage: number;
}

export interface AnalyticsData {
  id: string;
  totalScans: number;
  scansByDate: ScanData[];
  deviceBreakdown: DeviceData[];
  topLocations: LocationData[];
}

// Custom pattern type
export type PatternType = "squares" | "dots" | "rounded" | "classy";

export interface IQlikyRespone<T> {
  data: T;
  message: string;
  status: number;
  success: boolean;
  error?: string;
  errorCode?: string;
  errorMessage?: string;
}

export interface IQlikyRequest<T> {
  data: T;
}

export interface IQRInfo {
  url: string;
  name: string;
  promocode: string;
  isActive: boolean;
  qrcode: string;
  isStatic: boolean;
  email: string;
}
