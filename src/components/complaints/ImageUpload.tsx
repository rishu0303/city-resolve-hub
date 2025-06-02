
import React, { useState } from 'react';
import { Upload, X, Camera } from 'lucide-react';
import { Button } from '../ui/button';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, currentImage }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      setUploading(true);
      
      // Simulate file upload - in real app, upload to Cloudinary or your server
      setTimeout(() => {
        const fakeUrl = `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop`;
        onImageUpload(fakeUrl);
        setUploading(false);
      }, 1000);
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
          alt="Uploaded evidence"
          className="w-full h-48 object-cover rounded-lg border border-gray-200"
        />
        <Button
          type="button"
          variant="destructive"
          size="sm"
          className="absolute top-2 right-2"
          onClick={removeImage}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
        dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={uploading}
      />
      
      <div className="text-center">
        {uploading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        ) : (
          <Camera className="h-8 w-8 text-gray-400 mx-auto mb-4" />
        )}
        
        <p className="text-sm text-gray-600 mb-2">
          {uploading ? 'Uploading...' : 'Drop an image here, or click to select'}
        </p>
        
        <p className="text-xs text-gray-400">
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
    </div>
  );
};

export default ImageUpload;
