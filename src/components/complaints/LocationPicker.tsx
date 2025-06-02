
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { MapPin, Search } from 'lucide-react';

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);

  // Predefined locations for demo purposes
  const commonLocations = [
    { name: 'Main Street & 1st Ave', lat: 40.7128, lng: -74.0060, address: 'Main Street & 1st Avenue, New York, NY' },
    { name: 'Central Park Entrance', lat: 40.7829, lng: -73.9654, address: 'Central Park Entrance, New York, NY' },
    { name: 'City Hall', lat: 40.7127, lng: -74.0059, address: 'City Hall, New York, NY' },
    { name: 'Public Library', lat: 40.7531, lng: -73.9822, address: 'New York Public Library, New York, NY' }
  ];

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setSelectedLocation(location);
    onLocationSelect(location);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
          };
          handleLocationSelect(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to default location
          const defaultLocation = {
            lat: 40.7128,
            lng: -74.0060,
            address: 'New York, NY (Default Location)'
          };
          handleLocationSelect(defaultLocation);
        }
      );
    }
  };

  const handleAddressSearch = () => {
    if (address.trim()) {
      // Simulate address geocoding
      const location = {
        lat: 40.7128 + (Math.random() - 0.5) * 0.1,
        lng: -74.0060 + (Math.random() - 0.5) * 0.1,
        address: address
      };
      handleLocationSelect(location);
    }
  };

  return (
    <div className="space-y-4">
      {/* Address Search */}
      <div>
        <Label htmlFor="address-search">Search Address</Label>
        <div className="flex space-x-2 mt-1">
          <Input
            id="address-search"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter street address, landmark, or location"
          />
          <Button type="button" onClick={handleAddressSearch} disabled={!address.trim()}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Current Location */}
      <div>
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleUseCurrentLocation}
          className="w-full"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Use Current Location
        </Button>
      </div>

      {/* Common Locations */}
      <div>
        <Label>Common Locations</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
          {commonLocations.map((location, index) => (
            <Button
              key={index}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleLocationSelect(location)}
              className="justify-start text-left h-auto p-3"
            >
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <div>
                <div className="font-medium">{location.name}</div>
                <div className="text-xs text-gray-500 truncate">{location.address}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <Card>
        <CardContent className="p-4">
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">Interactive Map</p>
              <p className="text-xs">Click to select location</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedLocation && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center text-green-800">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="font-medium">Location Selected</span>
          </div>
          <p className="text-green-700 text-sm mt-1">{selectedLocation.address}</p>
          <p className="text-green-600 text-xs mt-1">
            Coordinates: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
