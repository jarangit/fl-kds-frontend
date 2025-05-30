import axios from "axios";
import type { ICreateOrder } from "./type";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ ดึงจาก .env
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ สร้างออเดอร์ใหม่
export const createOrder = async (data: ICreateOrder) => {
  const payload = {
    ...data,
    type: data.orderType,
  };
  const response = await api.post("/orders", payload);
  return response.data;
};

// ✅ ดึงรายการออเดอร์ทั้งหมด
export const fetchOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

// ✅ ลบออเดอร์ตาม ID
export const deleteOrder = async (id: number) => {
  const response = await api.delete(`/orders/${id}`);
  return response.data;
};
export const deleteOrderAll = async () => {
  const response = await api.delete(`/orders/clear`);
  return response.data;
};
// ✅ อัปเดตสถานะออเดอร์
export const updateOrderStatus = async (
  id: number,
  status: "PENDING" | "COMPLETED"
) => {
  const response = await api.patch(`/orders/${id}`, { status });
  return response.data;
};

export const report = async () => {
  const res = await api.get("/orders/report-monitor");
  return res.data;
};
