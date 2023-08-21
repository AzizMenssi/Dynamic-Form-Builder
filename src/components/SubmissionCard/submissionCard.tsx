import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import SubmissionApiService from '../../services/submissions.api.service';
import { popSubmission } from '../../redux/slices/submissionSlice';
import { useDispatch } from 'react-redux';
const SubmissionCard: React.FC<any> = ({ submission }) => {
    const { _id, data } = submission;
    const dispatch = useDispatch();
    const deleteSubmission = async () => {
        try {
            const submissions = await SubmissionApiService.deleteSubmission(submission).then((res: any) => {
                //@ts-ignore
                dispatch(popSubmission(res.data));
            }).catch((error: any) => {
                console.error(error);
            });
            return submissions;
        } catch (error) {
            throw error;
        }
    }
    return (
        <Card sx={{ maxWidth: 250, minWidth: 250 }}>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    ID:{_id}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"> <Link to={`/submissionRenderer/${_id}?action=view`}>
                    View
                </Link>
                </Button>
                <Button size="small" onClick={deleteSubmission}>Delete</Button>
            </CardActions>
        </Card>
    );
}
export default SubmissionCard;