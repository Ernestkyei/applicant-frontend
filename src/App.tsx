import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './pages/Home/LandingPage';
import { AccessCodePage } from './pages/auth/login/accessCode';
import ApplicantPage from './pages/applicantPage/ApplicantPage';
import Subscription from "./shared/SubscriptionPortal";

function App() {
  return (
    <>      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AccessCodePage />} />
          <Route path="/auth/login" element={<AccessCodePage />} />
          <Route path="/access-code" element={<AccessCodePage />} />
          <Route path="/applicant/dashboard" element={<ApplicantPage />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;