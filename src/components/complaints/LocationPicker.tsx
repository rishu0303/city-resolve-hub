
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
  const [address, setAddress] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const handleGetCurrentLocation = () => {
    setUseCurrentLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentAddress = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setAddress(currentAddress);
          onLocationSelect({
            lat: latitude,
            lng: longitude,
            address: currentAddress
          });
          setUseCurrentLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setUseCurrentLocation(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setUseCurrentLocation(false);
    }
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
    // For demo purposes, use a default location
    onLocationSelect({
      lat: 40.7128,
      lng: -74.0060,
      address: value
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          type="text"
          value={address}
          onChange={(e) => handleAddressChange(e.target.value)}
          placeholder="Enter the location address"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleGetCurrentLocation}
          disabled={useCurrentLocation}
        >
          <MapPin className="h-4 w-4 mr-2" />
          {useCurrentLocation ? 'Getting Location...' : 'Use Current Location'}
        </Button>
      </div>

      {address && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Selected: {address}</p>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
