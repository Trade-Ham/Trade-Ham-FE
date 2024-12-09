import React from "react";

const Profile = () => {
  // 예시 사용자 정보 (백엔드나 상태 관리에서 가져올 수 있음)
  const userInfo = {
    name: "Bruce Kim",
    email: "bruce@example.com",
    photo: "https://via.placeholder.com/150", // 프로필 이미지 URL
  };

  return (
    <div className="relative w-screen flex flex-col items-center mt-10 px-10">
      {/* 프로필 이미지 */}
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#FFD60A] shadow-md mb-6">
        <img
          src={userInfo.photo}
          alt="User Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 사용자 정보 */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#121212]">{userInfo.name}</h1>
        <p className="text-lg text-gray-600 mt-2">{userInfo.email}</p>
      </div>

      {/* 버튼 그룹 */}
      <div className="mt-8 flex space-x-4">
        <button className="px-6 py-2 bg-red-500 text-white text-lg font-bold rounded-full shadow-md hover:bg-red-600">
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Profile;
