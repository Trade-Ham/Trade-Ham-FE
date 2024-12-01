import { create } from "zustand";

// reissue API 응답 타입 정의
interface ReissueResponse {
  access: string;
}

// Zustand 상태 타입 정의
interface AuthState {
  reissueResponse: ReissueResponse | null; // reissue API 응답 데이터
  setReissueResponse: (data: ReissueResponse) => void; // reissue 데이터 설정 함수
}

export const useAuthStore = create<AuthState>((set) => ({
  reissueResponse: null,
  setReissueResponse: (data) => set({ reissueResponse: data }),
}));
