import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const SmartDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  // Route to appropriate dashboard based on user role
  switch (user.role) {
    case 'superAdmin':
      // Lazy load AdminDashboard
      const AdminDashboard = React.lazy(() => import('./AdminDashboard'));
      return (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>}>
          <AdminDashboard />
        </React.Suspense>
      );
    case 'departmentAdmin':
      // Lazy load DepartmentAdminDashboard
      const DepartmentAdminDashboard = React.lazy(() => import('./DepartmentAdminDashboard'));
      return (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>}>
          <DepartmentAdminDashboard />
        </React.Suspense>
      );
    case 'fieldAgent':
      // Lazy load FieldAgentDashboard
      const FieldAgentDashboard = React.lazy(() => import('./FieldAgentDashboard'));
      return (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>}>
          <FieldAgentDashboard />
        </React.Suspense>
      );
    case 'serviceProvider':
      // Lazy load ServiceProviderDashboard
      const ServiceProviderDashboard = React.lazy(() => import('./ServiceProviderDashboard'));
      return (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>}>
          <ServiceProviderDashboard />
        </React.Suspense>
      );
    case 'user':
    default:
      // Lazy load UserDashboard
      const UserDashboard = React.lazy(() => import('./UserDashboard'));
      return (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>}>
          <UserDashboard />
        </React.Suspense>
      );
  }
};

export default SmartDashboard;