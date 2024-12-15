import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./AuthStore";

interface PurchaseProduct {
  product_id: number;
  name: string;
  price: number;
  status: string;
  updated_at: string;
}

interface PurchaseState {
  purchases: PurchaseProduct[];
  fetchPurchases: () => Promise<void>;
}

export const usePurchaseStore = create<PurchaseState>((set) => ({
  purchases: [
    {
      product_id: 1,
      name: "UI/UX 피그마 완전 정복",
      price: 10000,
      status: "CHECK",
      updated_at: "2024-10-10 09:10:24",
    },
    {
      product_id: 2,
      name: "혼자서 공부하는 자바",
      price: 15000,
      status: "WAIT",
      updated_at: "2024-10-12 13:15:00",
    },
    {
      product_id: 3,
      name: "리액트와 타입스크립트의 조화",
      price: 20000,
      status: "DONE",
      updated_at: "2024-11-01 18:45:10",
    },
  ],
  fetchPurchases: async () => {
    try {
      const { reissueResponse } = useAuthStore.getState();
      const accessToken = reissueResponse?.access || "";

      console.log("Making API call with access token:", accessToken);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/my/purchase`,
        {
          headers: {
            "Content-Type": "application/json",
            access: accessToken,
          },
        }
      );

      const data = response.data.data;

      // 데이터가 존재하면 업데이트, 없으면 기존 상태 유지
      if (data && data.length > 0) {
        set({ purchases: data });
      } else {
        console.warn("No purchases found, keeping default data.");
      }
    } catch (error) {
      console.error("Failed to fetch purchase history:", error);
      // API 실패 시 더미 데이터 유지
    }
  },
}));
