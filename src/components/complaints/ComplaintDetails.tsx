
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useComplaints } from '../../contexts/ComplaintContext';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { MapPin, Calendar, User, ArrowLeft, Edit, Trash2 } from 'lucide-react';

const ComplaintDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { complaints, userComplaints, deleteComplaint, updateComplaintStatus } = useComplaints();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    // Find complaint in either complaints or userComplaints
    const found = [...complaints, ...userComplaints].find(c => c.id === id);
    setComplaint(found);
  }, [id, complaints, userComplaints]);

  if (!complaint) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Complaint not found</h2>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'pothole': return 'bg-orange-100 text-orange-800';
      case 'garbage': return 'bg-red-100 text-red-800';
      case 'streetlight': return 'bg-purple-100 text-purple-800';
      case 'water': return 'bg-cyan-100 text-cyan-800';
      case 'noise': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      const success = await deleteComplaint(complaint.id);
      if (success) {
        navigate('/dashboard');
      }
    }
  };

  const canEdit = user && (user.id === complaint.userId || ['superAdmin', 'departmentAdmin'].includes(user.role));
  const canDelete = user && (user.id === complaint.userId || ['superAdmin', 'departmentAdmin'].includes(user.role));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{complaint.title}</h1>
            <div className="flex flex-wrap gap-2">
              <Badge className={getStatusColor(complaint.status)}>
                {complaint.status}
              </Badge>
              <Badge variant="outline" className={getCategoryColor(complaint.category)}>
                {complaint.category}
              </Badge>
            </div>
          </div>
          {canEdit && (
            <div className="flex space-x-2 mt-4 md:mt-0">
              {canDelete && (
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{complaint.description}</p>
            </CardContent>
          </Card>

          {/* Image */}
          {complaint.imageUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Photo Evidence</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={complaint.imageUrl}
                  alt="Complaint evidence"
                  className="w-full h-auto rounded-lg border border-gray-200"
                />
              </CardContent>
            </Card>
          )}

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{complaint.location.address}</p>
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm">Map View</p>
                  <p className="text-xs">
                    {complaint.location.lat.toFixed(6)}, {complaint.location.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Status & Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge className={getStatusColor(complaint.status)}>
                  {complaint.status}
                </Badge>
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <div>
                    <p className="font-medium">Created</p>
                    <p className="text-gray-600">{formatDate(complaint.createdAt)}</p>
                  </div>
                </div>

                {complaint.updatedAt !== complaint.createdAt && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <div>
                      <p className="font-medium">Last Updated</p>
                      <p className="text-gray-600">{formatDate(complaint.updatedAt)}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Assignment */}
          {complaint.assignedTo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Assignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Assigned to: <span className="font-medium">{complaint.assignedTo}</span>
                </p>
              </CardContent>
            </Card>
          )}

          {/* Admin Actions */}
          {user && ['superAdmin', 'departmentAdmin', 'fieldAgent'].includes(user.role) && (
            <Card>
              <CardHeader>
                <CardTitle>Admin Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateComplaintStatus(complaint.id, 'In Progress')}
                  disabled={complaint.status === 'In Progress'}
                  className="w-full"
                >
                  Mark In Progress
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateComplaintStatus(complaint.id, 'Resolved')}
                  disabled={complaint.status === 'Resolved'}
                  className="w-full"
                >
                  Mark Resolved
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
