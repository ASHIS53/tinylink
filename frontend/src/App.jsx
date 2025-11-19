import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import StatsPage from "./pages/StatsPage";
import HealthPage from "./components/HealthPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <header className="bg-gray-50 pl-4 py-4 shadow">TinyLink</header>
      <main className="container px-4 mx-auto">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/code/:code" element={<StatsPage />} />
          <Route path="/healthz" element={<HealthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="bg-gray-100 p-2 text-center">© 2025 TinyLink</footer>
    </BrowserRouter>
  );
}
