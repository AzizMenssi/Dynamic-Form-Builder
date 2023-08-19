import styles from './Home.module.css';
import FormCard from '../../components/FormCard/FormCard';
import AddCard from '../../components/AddCard/AddCard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const Home: React.FC = () => {
  const formsData = [
    {
      id: 1,
      name: 'Form 1',
      description: 'Description for Form 1',
    },
    {
      id: 2,
      name: 'Form 2',
      description: 'Description for Form 2',
    },
    {
      id: 3,
      name: 'Form 3',
      description: 'Description for Form 3',
    },
    {
      id: 4,
      name: 'Form 4',
      description: 'Description for Form 4',
    },
    {
      id: 5,
      name: 'Form 5',
      description: 'Description for Form 5',
    },
  ];
  const forms = useSelector((state: any) => state.createForm.forms);
  useEffect(() => {
    console.log(forms)
  }, [forms]); return (
    <div className={styles.App}>
      <h1>Home Page</h1>
      <div className={styles.formContainer}>
        {formsData.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
        <AddCard />
      </div>
    </div>
  );
}
export default Home;