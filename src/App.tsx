import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import SellerRegistrationPage from "./pages/SellerRegistrationPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* MainPage: "/" 경로 */}
        <Route path="/" element={<MainPage />} />
        {/* LoginPage: "/login" 경로 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/registration" element={<SellerRegistrationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
