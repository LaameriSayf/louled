import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AccessDeniedPage from "./pages/AccessDeniedPage.jsx"; // Ensure this page exists
import BusinessOwnerPage from "./pages/BuisnessOwnerPage.jsx"; // Ensure this page exists
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import FaceReconPage from "./pages/FaceRecoPage.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import ViewProfilePage from "./pages/ViewProfilePage.jsx";
import UsersListPage from "./pages/UsersListPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<SignInPage />} />
        <Route exact path='/sign-in' element={<SignInPage />} />
        <Route exact path='/sign-up' element={<SignUpPage />} />
        <Route exact path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route exact path='/reset-password/:token' element={<ResetPasswordPage />} />
        <Route exact path='/face-recon' element={<FaceReconPage />} />
        <Route exact path='/sign-up/terms-conditions' element={<TermsAndConditions />} />
        <Route exact path='/view-profile' element={<ViewProfilePage />} />
        <Route exact path='/view-users' element={<UsersListPage />} />
        {/* Private Routes for role-based access */}
        <Route 
          path="/admin-dashboard" 
          element={
            <PrivateRoute allowedRoles={["Admin"]}>
              <AdminDashboardPage />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/business-owner-dashboard" 
          element={
            <PrivateRoute allowedRoles={["Business owner"]}>
              <BusinessOwnerPage />
            </PrivateRoute>
          } 
        />
        
        {/* Fallback route for unauthorized access */}
        <Route path="/access-denied" element={<AccessDeniedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
