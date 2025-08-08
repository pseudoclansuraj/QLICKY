import { Suspense, useEffect } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { auth, isMobileDevice } from "./libs/firebaseHelper";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Generator from "./pages/Generator";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import { QRCodeProvider } from "./contexts/QRCodeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { signInUser } from "./libs/storageHelper";
import { getRedirectResult } from "firebase/auth";
import Login from "./pages/Login";
import LoginViaLink from "./pages/LoginViaLink";
import Signup from "./pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardLayout from "./components/layout/DashboardLayout";
import MyQrcode from "./pages/MyQrcode";
import PlanPayments from "./pages/PlanPayments";
import Settings from "./pages/Settings";
import ContactUs from "./pages/ContactUs";

interface AuthComponentProps {
  allowedRoles: string[];
}

const PrivateRoute = ({ allowedRoles }: AuthComponentProps) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // For now, all authenticated users have "user" role
  const userRole = ["user"];
  if (!allowedRoles.some((role) => userRole.includes(role))) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

function AppLaunch() {
  useEffect(() => {
    let mounted = true;
    
    const completeLogin = async () => {
      if (isMobileDevice()) {
        try {
          const result = await getRedirectResult(auth);
          if (result && mounted) {
            // This is the signed-in user
            const user = result.user;
            signInUser(user);
            window.location.href = window.location.origin + "/dashboard/my-qrcode";
          }
        } catch (e) {
          console.error('Redirect result error:', e);
        }
      }
    };

    completeLogin();
    
    return () => {
      mounted = false;
    };
  }, []);

  return <div></div>;
}

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <QRCodeProvider>
          <Suspense fallback={<div className="lazy"></div>}>
            <>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="loginvialink" element={<LoginViaLink />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="contact" element={<ContactUs />} />
                  <Route element={<PrivateRoute allowedRoles={["user"]} />}>
                      <Route path="generator" element={<Generator />} />
                      <Route path="analytics" element={<Analytics />} />
                    <Route path="dashboard" element={<DashboardLayout />}>
                      <Route path="new-qrcode" element={<Generator />} />
                      <Route path="my-qrcode" element={<MyQrcode />} />
                      <Route path="stats" element={<Analytics />} />
                      <Route path="plan-payments" element={<PlanPayments />} />
                      <Route path="settings" element={<Settings />} />
                    </Route>
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
              <AppLaunch />
            </>
          </Suspense>
        </QRCodeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
