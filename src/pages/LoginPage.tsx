import React, { useEffect, useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import kakaoLoginButton from "/assets/images/kakao_login_medium_narrow.png";
import { useAuthStore } from "../store/AuthStore"; // zustand 스토어 임포트

const LoginPage = () => {
  const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN;
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const setReissueResponse = useAuthStore((state) => state.setReissueResponse); // Zustand 상태 함수

  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `${backendDomain}/oauth2/authorization/kakao`;
    window.location.href = kakaoLoginUrl;
  };

  const checkLoginStatus = useCallback(async () => {
    try {
      const response = await axios.get(`${backendDomain}/api/v1/auth/check`, {
        withCredentials: true, // 쿠키 기반 세션 확인
      });
      if (response.status === 200) {
        setIsLoggedIn(true);
        console.log("User is logged in.");
      }
    } catch (error) {
      console.error("Login status check failed:", error);
    }
  }, [backendDomain]);

  const startPolling = useCallback(() => {
    const pollingUrl = `${backendDomain}/api/v1/auth/reissue`;

    const intervalId = setInterval(async () => {
      try {
        const response = await axios.post(
          pollingUrl,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Polling response:", response.data);

        // Zustand 상태에 응답 데이터 저장
        setReissueResponse(response.data);

        if (response.data.status === "SUCCESS") {
          clearInterval(intervalId);
          console.log("Polling stopped successfully.");
        }
      } catch (err) {
        const error = err as AxiosError; // Type assertion
        console.error("Polling error:", error);

        if (error.response?.status === 401) {
          clearInterval(intervalId);
          console.log("Polling stopped due to error.");
        }
      }
    }, 1000); // 1초 간격
  }, [backendDomain, setReissueResponse]);

  useEffect(() => {
    // 컴포넌트 로드 시 로그인 상태 확인
    checkLoginStatus();
  }, [checkLoginStatus]);

  useEffect(() => {
    // 로그인 상태가 true일 때만 polling 시작
    if (isLoggedIn) {
      startPolling();
    }
  }, [isLoggedIn, startPolling]);

  return (
    <div className="flex items-center v-screen w-full">
      <div className="flex justify-center w-screen">
        <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <br></br>
          <label className="block text-[#121212] text-xl font-bold mb-2 flex justify-center">
            로그인
          </label>
          <br></br>
          <div className="flex items-center justify-center mt-5">
            <button
              type="button"
              onClick={handleKakaoLogin}
              className="p-0 m-0 border-none bg-transparent"
            >
              <img
                src={kakaoLoginButton}
                alt="Kakao Login"
                className="w-auto h-auto"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
