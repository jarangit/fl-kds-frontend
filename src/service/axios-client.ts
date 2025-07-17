import axios, { type AxiosInstance } from "axios";
import * as Sentry from "@sentry/react";

// Custom config interface
// interface CustomConfig {
//   silent?: boolean;
// }
// interface RequestConfig extends AxiosRequestConfig {
//   customConfig?: CustomConfig;
// }

const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ เพิ่ม Interceptor สำหรับจับ Error แล้วส่งไปยัง Sentry
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // ส่ง error ไปยัง Sentry
    Sentry.captureException(error);

    // ส่งข้อมูล context เพิ่มเติมได้ด้วย
    Sentry.setContext("axios", {
      url: error?.config?.url,
      method: error?.config?.method,
      status: error?.response?.status,
      data: error?.config?.data,
    });

    return Promise.reject(error); // อย่าลืมส่ง error กลับไปด้วย
  }
);

export default axiosClient;
