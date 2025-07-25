import React, { useEffect, useState } from 'react';
import { useComplaints } from '../../contexts/ComplaintContext';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import ComplaintCard from '../complaints/ComplaintCard';
import AssignComplaintModal from '../complaints/AssignComplaintModal';
import { Users, Clock, CheckCircle, Settings } from 'lucide-react';

const DepartmentAdminDashboard = () => {
  const { user } = useAuth();
  const { complaints, fetchComplaints, updateComplaintStatus, loading } = useComplaints();
  const [filter, setFilter] = useState<string>('all');
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Filter complaints by department
  const departmentComplaints = complaints.filter(complaint => {
    if (user?.department === 'electrical') return complaint.category === 'streetlight';
    if (user?.department === 'sanitation') return complaint.category === 'garbage';
    if (user?.department === 'roads') return complaint.category === 'pothole';
    if (user?.department === 'water') return complaint.category === 'water';
    return true;
  });

  const filteredComplaints = departmentComplaints.filter(complaint => {
    return filter === 'all' || complaint.status.toLowerCase() === filter;
  });

  const stats = {
    total: departmentComplaints.length,
    pending: departmentComplaints.filter(c => c.status === 'Pending').length,
    inProgress: departmentComplaints.filter(c => c.status === 'In Progress').length,
    resolved: departmentComplaints.filter(c => c.status === 'Resolved').length
  };

  const handleStatusUpdate = async (id: string, status: any) => {
    await updateComplaintStatus(id, status);
    fetchComplaints();
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
          {user?.department?.charAt(0).toUpperCase() + user?.department?.slice(1)} Department Dashboard
        </h1>
        <p className="text-gray-600">Manage complaints in your department</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Complaints</div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <Settings className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
                <div className="text-sm text-gray-600">Resolved</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
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
        </CardContent>
      </Card>

      {/* Complaints List */}
      {filteredComplaints.length > 0 ? (
        <div className="grid gap-4">
          {filteredComplaints.map((complaint) => (
            <div key={complaint.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <ComplaintCard complaint={complaint} isAdmin />
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusUpdate(complaint.id, 'In Progress')}
                  disabled={complaint.status === 'In Progress'}
                >
                  Mark In Progress
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusUpdate(complaint.id, 'Resolved')}
                  disabled={complaint.status === 'Resolved'}
                >
                  Mark Resolved
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedComplaint(complaint.id)}
                >
                  Assign Team
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No complaints found</h3>
            <p className="text-gray-600">No complaints in your department match the selected filters.</p>
          </CardContent>
        </Card>
      )}

      {selectedComplaint && (
        <AssignComplaintModal
          complaintId={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
      )}
    </div>
  );
};

export default DepartmentAdminDashboard;