
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { MapPin, Calendar, User } from 'lucide-react';
import { Complaint } from '../../contexts/ComplaintContext';

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
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <Link 
              to={`/complaint/${complaint.id}`}
              className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {complaint.title}
            </Link>
            <div className="flex space-x-2">
              <Badge className={getStatusColor(complaint.status)}>
                {complaint.status}
              </Badge>
              <Badge variant="outline" className={getCategoryColor(complaint.category)}>
                {complaint.category}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm line-clamp-2">
            {complaint.description}
          </p>

          {/* Image */}
          {complaint.imageUrl && (
            <img
              src={complaint.imageUrl}
              alt="Complaint evidence"
              className="w-full h-32 object-cover rounded-lg border border-gray-200"
            />
          )}

          {/* Footer */}
          <div className="flex flex-col space-y-2 text-xs text-gray-500">
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="truncate">{complaint.location.address}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formatDate(complaint.createdAt)}</span>
              </div>
              
              {complaint.assignedTo && (
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  <span className="truncate max-w-24">{complaint.assignedTo}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplaintCard;
