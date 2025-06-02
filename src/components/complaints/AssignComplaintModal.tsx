
import React, { useState } from 'react';
import { useComplaints } from '../../contexts/ComplaintContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';

interface AssignComplaintModalProps {
  complaintId: string;
  onClose: () => void;
}

const AssignComplaintModal: React.FC<AssignComplaintModalProps> = ({ complaintId, onClose }) => {
  const { assignComplaint } = useComplaints();
  const [selectedTeam, setSelectedTeam] = useState('');
  const [loading, setLoading] = useState(false);

  const teams = [
    'Road Maintenance Team',
    'Waste Management Team',
    'Electrical Services Team',
    'Water Department',
    'Environmental Services',
    'Public Safety Department'
  ];

  const handleAssign = async () => {
    if (!selectedTeam) return;

    setLoading(true);
    const success = await assignComplaint(complaintId, selectedTeam);
    if (success) {
      onClose();
    }
    setLoading(false);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Complaint</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <Label htmlFor="team-select">Select Team</Label>
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Choose a team to assign this complaint" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team} value={team}>
                  {team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!selectedTeam || loading}>
            {loading ? 'Assigning...' : 'Assign'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignComplaintModal;
