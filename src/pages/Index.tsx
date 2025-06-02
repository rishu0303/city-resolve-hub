
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ComplaintProvider } from '../contexts/ComplaintContext';
import Navbar from '../components/layout/Navbar';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import UserDashboard from '../components/dashboard/UserDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import SubmitComplaint from '../components/complaints/SubmitComplaint';
import ComplaintDetails from '../components/complaints/ComplaintDetails';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { Toaster } from 'sonner';

const Index = () => {
  return (
    <AuthProvider>
      <ComplaintProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <UserDashboard />
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
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </ComplaintProvider>
    </AuthProvider>
  );
};

export default Index;
