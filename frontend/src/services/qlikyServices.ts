import apiClient from "../libs/axios";
import { IQlikyRequest, IQlikyRespone, IQRInfo } from "../types";

export const createQRCode = async (data: IQlikyRequest<IQRInfo>) : Promise<IQlikyRespone<IQRInfo>> => {
  try {
    const response = await apiClient.post("save", data);
    return response.data;
  } catch (error) {
    console.error("Error creating QR code:", error);
    throw error;
  }
}

export const getQRCode = async (id: string) => {
  try {
    const response = await apiClient.get(`qrcode/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching QR code:", error);
    throw error;
  }
}

export const getQRCodeHistory = async (email: string) => {
  try {
    const response = await apiClient.get(`/list/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching QR code history:", error);
    throw error;
  }
}

export const deleteQRCode = async (id: string) => {
  try {
    const response = await apiClient.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting QR code:", error);
    throw error;
  }
}

export const getAnalyticsData = async (id: string) => {
  try {
    const response = await apiClient.get(`/analytics/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw error;
  }
}

