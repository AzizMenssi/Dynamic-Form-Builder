import { useParams } from 'react-router-dom';
import styles from './SubmissionRenderer.module.css';
import { useSelector } from 'react-redux';
import { selectSubmissionById } from '../../redux/selectors/selectorById';
const SubmissionRenderer: React.FC = () => {
    const { _id } = useParams();
    const getSubmissionById: any = useSelector(selectSubmissionById);
    const submissionToView = getSubmissionById(_id);
    return (
        <div className={styles.App}>
            <h1>View Submission</h1>
            <div className={styles.submissionContainer}>
                {submissionToView?.data && Object.entries(submissionToView.data).map(([key, value]: [string, any]) => (
                    <div className={styles.submissionItem} key={key}>
                        <h2>{key} : {value}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default SubmissionRenderer;