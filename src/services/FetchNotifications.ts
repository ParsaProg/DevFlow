import { BACKEND_BASE_URL } from "../constants/backendBaseUrl";

interface NotificationsService {
  setNotifications: (value: any) => void;
  setLoading: (val: boolean) => void;
}

export const fetchNotifications = async ({
  setNotifications,
  setLoading,
}: NotificationsService) => {
  try {
    const token = localStorage.getItem("accessToken") || "";
    const res = await fetch(`${BACKEND_BASE_URL}/api/v1/notifications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) setNotifications(data);
  } catch (err) {
    console.error("Error reading log pipelines:", err);
  } finally {
    setLoading(false);
  }
};
