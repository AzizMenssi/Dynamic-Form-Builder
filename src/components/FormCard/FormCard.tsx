import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

interface Form {
    id: number;
    name: string;
    description: string;
}
interface FormCardProps {
    form: Form;
}
const FormCard: React.FC<FormCardProps> = ({ form }) => {
    const { id, name, description } = form;
    return (
        <Card sx={{ maxWidth: 250, minWidth: 250 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View</Button>
                <Button size="small">
                    <Link to={`/formBuilder/${id}`}>
                        Edit
                    </Link>
                </Button>
                <Button size="small">Delete</Button>
            </CardActions>
        </Card>
    );
}
export default FormCard;