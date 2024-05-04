import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/ui/theme-provider";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <ModeToggle /> */}
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          {/* <InterfaceComponent /> */}
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
