/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { healthCheck } from "@/service/systems";

export function useSystemService() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await healthCheck();
        setData(data);
      } catch (err: any) {
        setError(true);
      
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return { data, loading, error };
}
