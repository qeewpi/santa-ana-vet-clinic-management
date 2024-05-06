import { supabase } from "@/lib/supabase/admin";
import { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
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
      } else {
        navigate("/dashboard");
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
                <AuthListener />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <SignUpPage />
                <AuthListener />
              </>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <>
                <LogInPage />
                <AuthListener />
              </>
            }
          ></Route>
          <Route
            path="/verify-email"
            element={
              <>
                <VerifyEmailPage />
                <AuthListener />
              </>
            }
          />
          <Route
            path="/email-verified"
            element={
              <>
                <EmailVerifiedPage />
                <AuthListener />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Dashboard />
                <AuthListener />
              </>
            }
          />
          {/* <InterfaceComponent /> */}
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
