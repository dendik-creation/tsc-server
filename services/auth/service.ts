import axios from "axios";

export async function getUserSession() {
  try {
    const response = await axios.get("/api/auth/session?target=user");
    return response?.data?.user;
  } catch (error) {
    console.error("Error fetching user session:", error);
    return null;
  }
}
export async function getAccessToken() {
  try {
    const response = await axios.get("/api/auth/session?target=token");
    return response?.data?.token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
}
