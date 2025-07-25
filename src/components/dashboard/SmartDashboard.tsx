import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import DepartmentAdminDashboard from './DepartmentAdminDashboard';
import FieldAgentDashboard from './FieldAgentDashboard';
import ServiceProviderDashboard from './ServiceProviderDashboard';

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
      return <AdminDashboard />;
    case 'departmentAdmin':
      return <DepartmentAdminDashboard />;
    case 'fieldAgent':
      return <FieldAgentDashboard />;
    case 'serviceProvider':
      return <ServiceProviderDashboard />;
    case 'user':
    default:
      return <UserDashboard />;
  }
};

export default SmartDashboard;