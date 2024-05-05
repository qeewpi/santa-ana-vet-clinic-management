import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/ui/theme-provider";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          {/* <InterfaceComponent /> */}
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
