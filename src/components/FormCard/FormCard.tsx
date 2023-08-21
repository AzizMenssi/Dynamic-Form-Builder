import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { popForm } from '../../redux/slices/formSlice'
import FormsApiService from '../../services/forms.api.service';
const FormCard: React.FC<any> = ({ form }) => {
    const { _id, formName, formDescription } = form;
    const dispatch = useDispatch();
    const deleteForm = async () => {
        try {
            const forms = await FormsApiService.deleteForm(form).then((res: any) => {
                //@ts-ignore
                dispatch(popForm(res.data));
            }).catch((error: any) => {
                console.error(error);
            });
            return forms;
        } catch (error) {
            throw error;
        }
    }
    return (
        <Card sx={{ maxWidth: 250, minWidth: 250 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {formName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {formDescription}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"> <Link to={`/formBuilder/${_id}?action=view`}>
                    View
                </Link>
                </Button>
                <Button size="small">
                    <Link to={`/formBuilder/${_id}?action=edit`}>
                        Edit
                    </Link>
                </Button>
                <Button size="small" onClick={deleteForm}>Delete</Button>
            </CardActions>
        </Card>
    );
}
export default FormCard;