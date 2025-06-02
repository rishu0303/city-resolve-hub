
import React from 'react';
import { Link } from 'react-router-dom';
import { Complaint } from '../../contexts/ComplaintContext';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MapPin, Calendar, User } from 'lucide-react';

interface ComplaintCardProps {
  complaint: Complaint;
  isAdmin?: boolean;
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint, isAdmin = false }) => {
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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{complaint.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className={getStatusColor(complaint.status)}>
                    {complaint.status}
                  </Badge>
                  <Badge variant="outline" className={getCategoryColor(complaint.category)}>
                    {complaint.category}
                  </Badge>
                </div>
              </div>
              {complaint.imageUrl && (
                <img
                  src={complaint.imageUrl}
                  alt="Complaint"
                  className="w-20 h-20 object-cover rounded-lg ml-4 flex-shrink-0"
                />
              )}
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">{complaint.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="truncate">{complaint.location.address}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Created {formatDate(complaint.createdAt)}</span>
              </div>
            </div>

            {complaint.assignedTo && (
              <div className="mt-2 flex items-center text-sm text-blue-600">
                <User className="h-4 w-4 mr-2" />
                <span>Assigned to: {complaint.assignedTo}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-2 md:ml-4">
            <Link to={`/complaint/${complaint.id}`}>
              <Button variant="outline" size="sm" className="w-full md:w-auto">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplaintCard;
