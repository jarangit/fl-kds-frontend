import axiosClient from "./axios-client";

export const healthCheck = async () => {
  const response = await axiosClient.get("/health");
  return response.data;
};
