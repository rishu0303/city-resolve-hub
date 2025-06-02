
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useComplaints } from '../../contexts/ComplaintContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import LocationPicker from './LocationPicker';
import ImageUpload from './ImageUpload';
import { MapPin, FileText, Camera, Map } from 'lucide-react';

const SubmitComplaint = () => {
  const { user } = useAuth();
  const { submitComplaint } = useComplaints();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: ''
    }
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'pothole', label: 'Pothole' },
    { value: 'garbage', label: 'Garbage Collection' },
    { value: 'streetlight', label: 'Street Light' },
    { value: 'water', label: 'Water/Drainage' },
    { value: 'noise', label: 'Noise Complaint' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    
    const success = await submitComplaint({
      ...formData,
      userId: user.id,
      category: formData.category as any
    });
    
    if (success) {
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setFormData(prev => ({ ...prev, location }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, imageUrl }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit a Complaint</h1>
        <p className="text-gray-600">Help us improve your community by reporting issues</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Complaint Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Brief description of the issue"
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide detailed information about the issue"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Image Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="h-5 w-5 mr-2" />
              Photo Evidence (Optional)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload onImageUpload={handleImageUpload} currentImage={formData.imageUrl} />
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Map className="h-5 w-5 mr-2" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LocationPicker onLocationSelect={handleLocationSelect} />
            {formData.location.address && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center text-blue-800">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Selected Location:</span>
                </div>
                <p className="text-blue-700 text-sm mt-1">{formData.location.address}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading || !formData.title || !formData.description || !formData.category}>
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubmitComplaint;
