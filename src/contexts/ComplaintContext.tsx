
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Complaint {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: 'pothole' | 'garbage' | 'streetlight' | 'water' | 'noise' | 'other';
  status: 'Pending' | 'In Progress' | 'Resolved';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  userId: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

interface ComplaintContextType {
  complaints: Complaint[];
  userComplaints: Complaint[];
  loading: boolean;
  submitComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<boolean>;
  updateComplaintStatus: (id: string, status: Complaint['status']) => Promise<boolean>;
  assignComplaint: (id: string, assignedTo: string) => Promise<boolean>;
  deleteComplaint: (id: string) => Promise<boolean>;
  fetchComplaints: () => Promise<void>;
  fetchUserComplaints: (userId: string) => Promise<void>;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
};

const mockComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Large pothole on Main Street',
    description: 'There is a dangerous pothole near the intersection that needs immediate attention.',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'pothole',
    status: 'In Progress',
    location: { lat: 40.7128, lng: -74.0060, address: '123 Main Street, New York, NY' },
    userId: '1',
    assignedTo: 'Road Maintenance Team',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-16T14:20:00Z'
  },
  {
    id: '2',
    title: 'Overflowing garbage bin',
    description: 'The garbage bin at Central Park entrance has been overflowing for days.',
    category: 'garbage',
    status: 'Pending',
    location: { lat: 40.7829, lng: -73.9654, address: 'Central Park Entrance, New York, NY' },
    userId: '1',
    createdAt: '2024-01-16T09:15:00Z',
    updatedAt: '2024-01-16T09:15:00Z'
  }
];

export const ComplaintProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [userComplaints, setUserComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setComplaints(mockComplaints);
    } catch (error) {
      toast.error('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserComplaints = async (userId: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const filtered = mockComplaints.filter(complaint => complaint.userId === userId);
      setUserComplaints(filtered);
    } catch (error) {
      toast.error('Failed to fetch user complaints');
    } finally {
      setLoading(false);
    }
  };

  const submitComplaint = async (complaintData: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newComplaint: Complaint = {
        ...complaintData,
        id: Date.now().toString(),
        status: 'Pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setComplaints(prev => [newComplaint, ...prev]);
      setUserComplaints(prev => [newComplaint, ...prev]);
      toast.success('Complaint submitted successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to submit complaint');
      return false;
    }
  };

  const updateComplaintStatus = async (id: string, status: Complaint['status']): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updateComplaint = (complaint: Complaint) => 
        complaint.id === id 
          ? { ...complaint, status, updatedAt: new Date().toISOString() }
          : complaint;
      
      setComplaints(prev => prev.map(updateComplaint));
      setUserComplaints(prev => prev.map(updateComplaint));
      toast.success('Complaint status updated successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to update complaint status');
      return false;
    }
  };

  const assignComplaint = async (id: string, assignedTo: string): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updateComplaint = (complaint: Complaint) => 
        complaint.id === id 
          ? { ...complaint, assignedTo, updatedAt: new Date().toISOString() }
          : complaint;
      
      setComplaints(prev => prev.map(updateComplaint));
      setUserComplaints(prev => prev.map(updateComplaint));
      toast.success('Complaint assigned successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to assign complaint');
      return false;
    }
  };

  const deleteComplaint = async (id: string): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setComplaints(prev => prev.filter(complaint => complaint.id !== id));
      setUserComplaints(prev => prev.filter(complaint => complaint.id !== id));
      toast.success('Complaint deleted successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to delete complaint');
      return false;
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <ComplaintContext.Provider value={{
      complaints,
      userComplaints,
      loading,
      submitComplaint,
      updateComplaintStatus,
      assignComplaint,
      deleteComplaint,
      fetchComplaints,
      fetchUserComplaints
    }}>
      {children}
    </ComplaintContext.Provider>
  );
};
