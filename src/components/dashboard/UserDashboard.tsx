
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useComplaints } from '../../contexts/ComplaintContext';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import ComplaintCard from '../complaints/ComplaintCard';
import { MapPin } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const { userComplaints, fetchUserComplaints, loading } = useComplaints();
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (user) {
      fetchUserComplaints(user.id);
    }
  }, [user]);

  const filteredComplaints = userComplaints.filter(complaint => 
    filter === 'all' || complaint.status.toLowerCase() === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: userComplaints.length,
    pending: userComplaints.filter(c => c.status === 'Pending').length,
    inProgress: userComplaints.filter(c => c.status === 'In Progress').length,
    resolved: userComplaints.filter(c => c.status === 'Resolved').length
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">Track and manage your submitted complaints</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Complaints</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            <div className="text-sm text-gray-600">Resolved</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Your Complaints</h2>
        </div>
        <Link to="/submit">
          <Button>Submit New Complaint</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending', 'in progress', 'resolved'].map((status) => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Complaints List */}
      {filteredComplaints.length > 0 ? (
        <div className="grid gap-4">
          {filteredComplaints.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No complaints found
            </h3>
            <p className="text-gray-600 mb-4">
              {filter === 'all' 
                ? "You haven't submitted any complaints yet." 
                : `No complaints with status "${filter}" found.`}
            </p>
            {filter === 'all' && (
              <Link to="/submit">
                <Button>Submit Your First Complaint</Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserDashboard;
