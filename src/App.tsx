
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { ComplaintProvider } from './contexts/ComplaintContext';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import AdminLogin from './components/auth/AdminLogin';
import Register from './components/auth/Register';
import SmartDashboard from './components/dashboard/SmartDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import SubmitComplaint from './components/complaints/SubmitComplaint';
import ComplaintDetails from './components/complaints/ComplaintDetails';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ComplaintProvider>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="pt-16">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/register" element={<Register />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <SmartDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute adminOnly>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/submit" 
                    element={
                      <ProtectedRoute>
                        <SubmitComplaint />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/complaint/:id" 
                    element={
                      <ProtectedRoute>
                        <ComplaintDetails />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/" element={<ProtectedRoute><SmartDashboard /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </ComplaintProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
