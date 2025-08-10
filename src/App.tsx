import { Suspense, useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { auth, isMobileDevice, clearFirebaseAuth } from "./libs/firebaseHelper";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Generator from "./pages/Generator";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import { QRCodeProvider } from "./contexts/QRCodeContext";
import { getToken, signInUser, isValidSession, signOut } from "./libs/storageHelper";
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
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const validateSession = async () => {
      const token = getToken();
      if (!token) {
        setIsAuthenticated(false);
        setIsValidating(false);
        return;
      }
      
      try {
        const valid = await isValidSession();
        if (!valid) {
          // Clear invalid session
          signOut();
          clearFirebaseAuth();
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("Session validation error:", error);
        signOut();
        clearFirebaseAuth();
        setIsAuthenticated(false);
      }
      
      setIsValidating(false);
    };
    
    validateSession();
  }, []);
  
  if (isValidating) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Role check
  const userRole = ["user"];
  if (!allowedRoles.some((role) => userRole.includes(role))) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

function AppLaunch() {
  const completeLogin = async () => {
    // Only try to complete mobile redirects, don't auto-authenticate
    if (isMobileDevice()) {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // This is the signed-in user from a mobile redirect
          const user = result.user;
          signInUser(user);
          window.location.href = window.location.origin + "/dashboard/my-qrcode";
        }
      } catch (e) {
        console.log("Mobile redirect completion error:", e);
      }
    }
  };

  useEffect(() => {
    try {
      const uid = getToken();
      if (!uid) {
       
        if (isMobileDevice()) {
          completeLogin();
        } else {
          
          clearFirebaseAuth();
        }
      }
      return () => {};
    } catch (e) {
      console.log("Error: ", e);
    }
  }, []);

  return <div></div>;
}

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
