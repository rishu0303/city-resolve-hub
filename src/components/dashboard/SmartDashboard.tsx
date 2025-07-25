import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

// Lazy load all dashboard components at the top level
const UserDashboard = React.lazy(() => import('./UserDashboard'));
const AdminDashboard = React.lazy(() => import('./AdminDashboard'));
const DepartmentAdminDashboard = React.lazy(() => import('./DepartmentAdminDashboard'));
const FieldAgentDashboard = React.lazy(() => import('./FieldAgentDashboard'));
const ServiceProviderDashboard = React.lazy(() => import('./ServiceProviderDashboard'));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

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
      return (
        <React.Suspense fallback={<LoadingSpinner />}>
          <AdminDashboard />
        </React.Suspense>
      );
    case 'departmentAdmin':
      return (
        <React.Suspense fallback={<LoadingSpinner />}>
          <DepartmentAdminDashboard />
        </React.Suspense>
      );
    case 'fieldAgent':
      return (
        <React.Suspense fallback={<LoadingSpinner />}>
          <FieldAgentDashboard />
        </React.Suspense>
      );
    case 'serviceProvider':
      return (
        <React.Suspense fallback={<LoadingSpinner />}>
          <ServiceProviderDashboard />
        </React.Suspense>
      );
    case 'user':
    default:
      return (
        <React.Suspense fallback={<LoadingSpinner />}>
          <UserDashboard />
        </React.Suspense>
      );
  }
};

export default SmartDashboard;