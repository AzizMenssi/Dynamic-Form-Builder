import { Button } from '@mui/material';

interface DeleteInputProps {
  onDelete: () => void;
}

const DeleteInput: React.FC<DeleteInputProps> = ({ onDelete }) => {
  return (
    <Button variant="outlined" color="error" onClick={onDelete}>
      Delete
    </Button>
  );
};

export default DeleteInput;