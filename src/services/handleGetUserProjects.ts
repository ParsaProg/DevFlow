import { BACKEND_BASE_URL } from "../constants/backendBaseUrl";

export const GetUserProjects = async (): Promise<any> => {
  let accessToken = localStorage.getItem("accessToken") || "";

  // Helper function to handle the fetch request
  const sendFetchRequest = async (token: string) => {
    // Note: Changed endpoint from '/projects' to match your routing layout (e.g., '/api/v1/projects/my-projects')
    return await fetch(`${BACKEND_BASE_URL}/api/v1/projects`, {
      credentials: "include", // Enforces sending your secure refreshToken cookie
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ⚡ FIXED: Typo corrected from Berear to Bearer
      },
    });
  };

  try {
    let response = await sendFetchRequest(accessToken);

    // 🔄 SILENT REFRESH: If access token is expired (401), rotate it seamlessly
    if (response.status === 401) {
      console.log("Dashboard token expired. Intercepting and refreshing...");

      const refreshResponse = await fetch(
        `${BACKEND_BASE_URL}/api/v1/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        const newAccessToken = refreshData.accessToken;

        // Save the new token for subsequent route transitions
        localStorage.setItem("accessToken", newAccessToken || "");

        // Retry the original query with the updated access token
        response = await sendFetchRequest(newAccessToken);
      }
    }

    // Final safety verification check
    if (!response.ok) {
      // If even the refresh token is dead, clear state or redirect
      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        window.location.href = "/auth/sign-in";
      }
      return null;
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Failed to collect backend project resources:", error);
    return null;
  }
};
