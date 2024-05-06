import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/ui/theme-provider";
import LandingPage from "./pages/LandingPage/LandingPage";
import LogInPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import VerifyEmailPage from "./pages/VerifyEmail/VerifyEmailPage";

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/login" element={<LogInPage />}></Route>
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          {/* <InterfaceComponent /> */}
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
