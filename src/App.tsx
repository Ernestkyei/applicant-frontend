import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Header } from "./components/common/Header";
import LandingPage from "./pages/Home/HeroSection";
import { AccessCodePage } from "./pages/auth/login/accessCode";
import ApplicantPage from "./pages/applicantPage/ApplicantPage";
import Payment from "./pages/applicantPage/payment";
import ProfilePage from "./pages/applicantPage/profile";
import StatusPage from "./pages/applicantPage/status";
import Subscription from "./shared/SubscriptionPortal";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AccessCodePage />} />
          <Route path="/auth/login" element={<AccessCodePage />} />
          <Route path="/access-code" element={<AccessCodePage />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/applicant/dashboard" element={<ApplicantPage />} />
          <Route path="/applicant/payment" element={<Payment />} />
          <Route path="/applicant/status" element={<StatusPage />} />
          <Route path="/applicant/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;