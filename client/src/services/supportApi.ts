import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Payload type for support/enquiry messages
export interface SupportPayload {
  name: string;
  email: string;
  message: string;
}

// Send support message
export const sendSupportMessage = async (data: SupportPayload): Promise<{ success: boolean; message: string }> => {
  const res = await axios.post<{ success: boolean; message: string }>(
    `${API_URL}/support`,
    data
  );
  return res.data;
};
