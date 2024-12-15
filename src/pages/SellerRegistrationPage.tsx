import React, { useState } from "react";
import axios from "axios";
import Header from "../layout/Header";

const SellerRegistrationPage = () => {
  const [account, setAccount] = useState("");
  const [realname, setRealname] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/seller`,
        {
          account,
          realname,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setMessage("판매자 등록이 성공적으로 완료되었습니다.");
      }
    } catch (error) {
      console.error("Error registering seller:", error);
      setMessage("판매자 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col box-border overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col items-center w-full px-6 mt-8">
        {/* 판매자 등록 헤더 */}
        <div className="w-[80%] mt-8">
          <a className="text-[#121212] text-2xl font-semibold">판매자 등록</a>
          <div className="w-full h-[2px] bg-gray-300 mt-2"></div>
        </div>

        {/* 등록 폼 */}
        <form
          onSubmit={handleSubmit}
          className="w-[80%] mt-6 flex flex-col gap-4"
        >
          <label className="flex flex-col text-[#121212] text-lg font-medium">
            계좌번호
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="123-456-789"
              className="border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-transparent"
              required
            />
          </label>

          <label className="flex flex-col text-[#121212] text-lg font-medium">
            실명
            <input
              type="text"
              value={realname}
              onChange={(e) => setRealname(e.target.value)}
              placeholder="홍길동"
              className="border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-transparent"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white text-lg font-bold py-2 mt-6 rounded-lg shadow-md hover:bg-blue-600 transition ease-in-out duration-300"
          >
            등록하기
          </button>
        </form>

        {/* 메시지 출력 */}
        {message && (
          <p className="mt-4 text-center text-lg font-medium text-blue-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SellerRegistrationPage;
