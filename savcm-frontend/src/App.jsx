import "./App.css";

import { Toaster } from "@/components/ui/toaster";

import { supabase } from "@/lib/supabase/create";
import { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import LogInPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import EmailVerifiedPage from "./pages/VerifyEmail/EmailVerifiedPage";
import VerifyEmailPage from "./pages/VerifyEmail/VerifyEmailPage";

function AuthListener() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate("/");
      }
    });
  }, []);

  return null;
}

function AuthListenerSignedIn() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      if (
        session &&
        (location.pathname === "/login" ||
          location.pathname === "/sign-up" ||
          location.pathname === "/verify-email" ||
          location.pathname === "/email-verified" ||
          location.pathname === "/")
      ) {
        navigate("/dashboard/pets");
      }
    });
  }, []);

  return null;
}

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <LandingPage />
                <AuthListenerSignedIn />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <SignUpPage />
                <AuthListenerSignedIn />
              </>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <>
                <LogInPage />
                <AuthListenerSignedIn />
              </>
            }
          ></Route>
          <Route
            path="/verify-email"
            element={
              <>
                <VerifyEmailPage />
                <AuthListenerSignedIn />
              </>
            }
          />
          <Route
            path="/email-verified"
            element={
              <>
                <EmailVerifiedPage />
                <AuthListenerSignedIn />
              </>
            }
          />
          <Route
            path="/dashboard/:page"
            element={
              <>
                <Dashboard />
                <AuthListener />
              </>
            }
          />

          {/* <InterfaceComponent /> */}
        </Routes>
        <Toaster />
      </ThemeProvider>
    </Router>
  );
}

export default App;
