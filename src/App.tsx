import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Pages
import SplashScreen from "./pages/SplashScreen";
import LoginScreen from "./pages/LoginScreen";
import AccountScreen from "./pages/AccountScreen";
import NotFound from "./pages/NotFound";

// Client Pages
import ClientDashboard from "./pages/client/ClientDashboard";
import MyContainers from "./pages/client/MyContainers";
import MyQRCode from "./pages/client/MyQRCode";
import MyCoins from "./pages/client/MyCoins";

// Company Pages
import CompanyDashboard from "./pages/company/CompanyDashboard";
import MyStock from "./pages/company/MyStock";
import QRScanner from "./pages/company/QRScanner";

const queryClient = new QueryClient();

// Protected Route wrapper
const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode; allowedRole?: 'client' | 'company' }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to={user?.role === 'client' ? '/client/dashboard' : '/company/dashboard'} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      
      {/* Client Routes */}
      <Route path="/client/dashboard" element={
        <ProtectedRoute allowedRole="client">
          <ClientDashboard />
        </ProtectedRoute>
      } />
      <Route path="/client/containers" element={
        <ProtectedRoute allowedRole="client">
          <MyContainers />
        </ProtectedRoute>
      } />
      <Route path="/client/qr-code" element={
        <ProtectedRoute allowedRole="client">
          <MyQRCode />
        </ProtectedRoute>
      } />
      <Route path="/client/coins" element={
        <ProtectedRoute allowedRole="client">
          <MyCoins />
        </ProtectedRoute>
      } />
      
      {/* Company Routes */}
      <Route path="/company/dashboard" element={
        <ProtectedRoute allowedRole="company">
          <CompanyDashboard />
        </ProtectedRoute>
      } />
      <Route path="/company/stock" element={
        <ProtectedRoute allowedRole="company">
          <MyStock />
        </ProtectedRoute>
      } />
      <Route path="/company/scanner" element={
        <ProtectedRoute allowedRole="company">
          <QRScanner />
        </ProtectedRoute>
      } />
      
      {/* Shared Routes */}
      <Route path="/account" element={
        <ProtectedRoute>
          <AccountScreen />
        </ProtectedRoute>
      } />
      
      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
