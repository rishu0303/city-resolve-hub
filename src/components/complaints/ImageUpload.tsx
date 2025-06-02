
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Camera, Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, currentImage }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      // Simulate file upload - in real app, upload to Cloudinary or similar service
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImageUpload(imageUrl);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeImage = () => {
    onImageUpload('');
  };

  if (currentImage) {
    return (
      <div className="relative">
        <img
          src={currentImage}
          alt="Uploaded"
          className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
        />
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={removeImage}
          className="absolute top-2 right-2"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Card
      className={`border-2 border-dashed transition-colors ${
        dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
    >
      <CardContent className="p-8">
        <div className="text-center">
          {uploading ? (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          ) : (
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          )}
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {uploading ? 'Uploading...' : 'Upload Photo'}
          </h3>
          
          <p className="text-sm text-gray-600 mb-4">
            Drag and drop an image here, or click to select a file
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <label htmlFor="file-upload">
              <Button type="button" disabled={uploading} asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </span>
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              disabled={uploading}
            />
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            Supported formats: JPEG, PNG, GIF (max 5MB)
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
