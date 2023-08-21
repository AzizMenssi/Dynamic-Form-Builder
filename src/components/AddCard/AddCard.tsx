import styles from './AddCard.module.css';
import { Link } from 'react-router-dom';

const AddCard: React.FC = () => {
    return (
        <Link to={`/formBuilder?action=create`} className={styles.title}>
                +
        </Link>
    );
}
export default AddCard;
