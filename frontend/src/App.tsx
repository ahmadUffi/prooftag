import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DashboardLayout from "./pages/dashboard/Layout";
import Overview from "./pages/dashboard/Overview";
import Products from "./pages/dashboard/Products";
import Tracking from "./pages/dashboard/Tracking";
import Logs from "./pages/dashboard/Logs";
import Ownership from "./pages/dashboard/Ownership";
import QrStyling from "./pages/dashboard/QrStyling";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";
import Verify from "./pages/Verify";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

export default function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify/:id" element={<Verify />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="products" element={<Products />} />
            <Route path="products/qr" element={<QrStyling />} />
            <Route path="tracking" element={<Tracking />} />
            <Route path="logs" element={<Logs />} />
            <Route path="ownership" element={<Ownership />} />
            <Route path="qr" element={<QrStyling />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </TooltipProvider>
  );
}
