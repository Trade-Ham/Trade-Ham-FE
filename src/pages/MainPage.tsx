import React, { useCallback } from "react";
import Header from "../layout/Header";
import { GridCard } from "../components/grid-card";
import Searchbox from "../ui/searchbox";
import { useAuthStore } from "../store/AuthStore";
import axios, { AxiosError } from "axios";

const MainPage = () => {
  const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN;
  const access = useAuthStore((state) => state.reissueResponse?.access); // Zustand 상태에서 access 값 가져오기
  const setReissueResponse = useAuthStore((state) => state.setReissueResponse); // Zustand 상태 함수

  const startPolling = useCallback(() => {
    console.log("API REQUEST : ");

    // 로그로 access 값을 출력
    console.log("Current access value:", access);

    // access가 null이나 undefined일 때만 요청을 보냄
    if (access === null || access === undefined) {
      const pollingUrl = `${backendDomain}/api/v1/auth/access`;

      // Axios 요청 인터셉터 추가
      axios.interceptors.request.use((config) => {
        // 요청 본문에서 access가 undefined이면 null로 설정하여 빈 문자열을 방지
        if (config.data && config.data.access === undefined) {
          config.data.access = null; // access 값을 null로 설정
        }

        console.log("Request Headers:", config.headers); // 요청 헤더 로그 찍기
        console.log("Request Data:", config.data); // 요청 본문 로그 찍기
        return config; // 요청이 실제로 보내지도록 config를 반환
      });

      const intervalId = setInterval(async () => {
        try {
          // 요청 시 access를 포함하지 않고 빈 객체만 보냄
          const response = await axios.post(
            pollingUrl,
            {}, // 본문에서 access를 포함하지 않음
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          console.log("Polling response:", response.data);

          // 응답에서 access 값을 확인하여 상태에 저장
          if (response.data && response.data.access !== undefined) {
            setReissueResponse({ access: response.data.access }); // access만 상태에 저장
          }

          if (response.data.status === "SUCCESS") {
            clearInterval(intervalId);
            console.log("Polling stopped successfully.");
          }
        } catch (err) {
          const error = err as AxiosError;
          console.error("Polling error:", error);

          if (error.response?.status === 401) {
            clearInterval(intervalId);
            console.log("Polling stopped due to error.");
          }
        }
      }, 10000000); // 1초 간격
    } else {
      console.log(
        "Access is either empty string or valid, skipping polling request."
      );
    }
  }, [backendDomain, access, setReissueResponse]); // access가 변경될 때마다 호

  startPolling();

  return (
    <div className="w-screen h-screen flex flex-col box-border overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col items-center mt-8">
        <Searchbox />
        <div className="w-[80%] mt-16">
          <a className="text-[#121212] text-2xl font-semibold">
            등록된 상품 목록
          </a>
          <div className="w-full h-[2px] bg-gray-300 mt-2"></div>
        </div>
        <GridCard />
      </div>
    </div>
  );
};

export default MainPage;
