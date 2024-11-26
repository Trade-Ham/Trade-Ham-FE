import React from "react";
import kakaoLoginButton from "/assets/images/kakao_login_medium_narrow.png";

const LoginPage = () => {
  const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN;

  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `${backendDomain}/oauth2/authorization/kakao`;
    window.location.href = kakaoLoginUrl;
  };

  return (
    <div className="flex items-center v-screen w-full">
      <div className="flex justify-center w-screen">
        <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <br></br>
          <label className="block text-primary_text text-xl font-bold mb-2 flex justify-center">
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
