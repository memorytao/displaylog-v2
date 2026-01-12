import { API_BASE_URL } from "../constants/url";

export const fetchLogs = async (payload, signal) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/getlog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return response.json();
};