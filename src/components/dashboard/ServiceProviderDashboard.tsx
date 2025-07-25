import React, { useEffect, useState } from 'react';
import { useComplaints } from '../../contexts/ComplaintContext';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import ComplaintCard from '../complaints/ComplaintCard';
import { MapPin, Clock, CheckCircle, Settings, Upload } from 'lucide-react';

const ServiceProviderDashboard = () => {
  const { user } = useAuth();
  const { complaints, fetchComplaints, updateComplaintStatus, loading } = useComplaints();
  const [availability, setAvailability] = useState(user?.availability || false);
  const [completionNotes, setCompletionNotes] = useState<{[key: string]: string}>({});

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Filter complaints assigned to this service provider in their department
  const assignedComplaints = complaints.filter(complaint => {
    const isAssigned = complaint.assignedProvider === user?.name || complaint.assignedProvider === user?.id;
    const isDepartmentMatch = user?.department === 'electrical' ? complaint.category === 'streetlight' : 
                             user?.department === 'sanitation' ? complaint.category === 'garbage' :
                             user?.department === 'roads' ? complaint.category === 'pothole' :
                             user?.department === 'water' ? complaint.category === 'water' : true;
    return isAssigned || (complaint.status === 'Pending' && isDepartmentMatch);
  });

  const stats = {
    available: assignedComplaints.filter(c => c.status === 'Pending').length,
    inProgress: assignedComplaints.filter(c => c.status === 'In Progress').length,
    completed: assignedComplaints.filter(c => c.status === 'Resolved').length,
  };

  const handleStatusUpdate = async (id: string, status: any) => {
    await updateComplaintStatus(id, status);
    fetchComplaints();
  };

  const handleAvailabilityToggle = (newAvailability: boolean) => {
    setAvailability(newAvailability);
    // In a real app, this would update the backend
    console.log('Availability updated:', newAvailability);
  };

  const handleCompleteWork = async (complaintId: string) => {
    const notes = completionNotes[complaintId];
    if (!notes?.trim()) {
      alert('Please add completion notes before marking as resolved.');
      return;
    }
    
    await handleStatusUpdate(complaintId, 'Resolved');
    setCompletionNotes(prev => ({ ...prev, [complaintId]: '' }));
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Provider Dashboard</h1>
        <p className="text-gray-600">Manage your work assignments - {user?.department} specialist</p>
      </div>

      {/* Availability Toggle */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Availability Status</h3>
              <p className="text-sm text-gray-600">Toggle your availability for new work assignments</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium ${availability ? 'text-green-600' : 'text-red-600'}`}>
                {availability ? 'Available' : 'Unavailable'}
              </span>
              <Switch
                checked={availability}
                onCheckedChange={handleAvailabilityToggle}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-2xl font-bold text-blue-600">{stats.available}</div>
                <div className="text-sm text-gray-600">Available Jobs</div>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <Settings className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Work Assignments */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Work Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          {assignedComplaints.length > 0 ? (
            <div className="space-y-6">
              {assignedComplaints.map((complaint) => (
                <div key={complaint.id} className="border border-gray-200 rounded-lg p-4">
                  <ComplaintCard complaint={complaint} />
                  
                  {complaint.status === 'In Progress' && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Completion Notes
                        </label>
                        <Textarea
                          placeholder="Describe the work completed, materials used, etc."
                          value={completionNotes[complaint.id] || ''}
                          onChange={(e) => setCompletionNotes(prev => ({
                            ...prev,
                            [complaint.id]: e.target.value
                          }))}
                          className="mb-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Upload Completion Photo
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Click to upload completion photo</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {complaint.status === 'Pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(complaint.id, 'In Progress')}
                      >
                        Accept Job
                      </Button>
                    )}
                    {complaint.status === 'In Progress' && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleCompleteWork(complaint.id)}
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No work assignments</h3>
              <p className="text-gray-600">You currently have no work assignments.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceProviderDashboard;