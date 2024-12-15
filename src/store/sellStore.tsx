import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./AuthStore";

interface SellProduct {
  product_id: number;
  name: string;
  description: string; // 설명 필드 추가
  price: number;
  status: string;
  updated_at: string;
}

interface SellState {
  sells: SellProduct[];
  fetchSells: () => Promise<void>;
}

export const useSellStore = create<SellState>((set) => ({
  sells: [
    {
      product_id: 1,
      name: "UI/UX 피그마 완전 정복",
      description: "피그마 책입니다.",
      price: 10000,
      status: "SELL",
      updated_at: "2024-10-10 09:10:24",
    },
    {
      product_id: 2,
      name: "혼자서 공부하는 자바",
      description: "자바 독학하는 책입니다.",
      price: 15000,
      status: "CHECK",
      updated_at: "2024-10-12 13:15:00",
    },
    {
      product_id: 3,
      name: "리액트와 타입스크립트의 조화",
      description: "리액트와 타입스크립트를 쉽게 배우는 책입니다.",
      price: 20000,
      status: "DONE",
      updated_at: "2024-11-01 18:45:10",
    },
  ],
  fetchSells: async () => {
    try {
      const { reissueResponse } = useAuthStore.getState();
      const accessToken = reissueResponse?.access || "";

      console.log("Making API call with access token:", accessToken);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/my/sell`,
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
        set({ sells: data });
      } else {
        console.warn("No sells found, keeping default data.");
      }
    } catch (error) {
      console.error("Failed to fetch sell history:", error);
      // API 실패 시 더미 데이터 유지
    }
  },
}));
