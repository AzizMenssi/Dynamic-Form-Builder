import styles from './AddCard.module.css';
import { Link } from 'react-router-dom';

const AddCard: React.FC = () => {
    return (
        <div className={styles.title}>
            <Link to={`/formBuilder`}>+</Link>
        </div >
    );
}
export default AddCard;
