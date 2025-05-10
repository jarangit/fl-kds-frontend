import { useState, useEffect } from "react";
import OrderCard from "../components/ui-system/components/order-card";
import { fetchOrders, deleteOrder } from "../service/order-service";
import { socket } from "../socket";
import HeaderSection from "../components/ui-system/components/header-section";

interface Order {
  id: number;
  orderNumber: string;
  type: "TOGO" | "DINEIN";
  status: string;
  createdAt: string;
}
const notifySound = new Audio("/sound/ring.mp3"); // ✅ ชี้ไปที่ public/notify.mp3

function KitchenMonitor() {
  const [orders, setOrders] = useState<Order[]>([]);
  // ✅ ขอสิทธิ์แจ้งเตือนระบบ (browser notification)
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket");
    });
    socket.on("order-deleted", ({ id }) => {
      setOrders((prev) => prev.filter((order) => order.id !== id));
    });
    socket.on("new-order", (order: Order) => {
      setOrders((prev) => [order, ...prev]);
      // 🔔 System Notification
      console.log("alert");
      // ✅ เล่นเสียง
      notifySound.currentTime = 0;
      notifySound.play().catch((err) => {
        console.warn("Unable to play sound:", err);
      });
    });

    socket.on("order-updated", (updatedOrder: Order) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    });

    return () => {
      socket.off("new-order");
    };
  }, []);
  // Removed duplicate state declaration

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  const handleDelete = async (id: number) => {
    await deleteOrder(id);
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div id="content-page" className="flex-1 flex flex-col gap-6">
      <HeaderSection title="Kitchen monitor" />
      <div className="flex flex-1 bg-gray-200 rounded-lg flex-col">
        <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-6 xl:grid-cols-8 gap-3 p-3 ">
          {orders?.length &&
            orders.map((order, key) => (
              <div key={key}>
                <OrderCard
                  order={order}
                  onDelete={() => handleDelete(order.id)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default KitchenMonitor;
