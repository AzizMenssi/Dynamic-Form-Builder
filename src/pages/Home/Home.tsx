import styles from './Home.module.css';
import FormCard from '../../components/FormCard/FormCard';
import AddCard from '../../components/AddCard/AddCard';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SubmissionCard from '../../components/SubmissionCard/submissionCard';
const Home: React.FC = () => {
  const formsList = useSelector((state: any) => state.forms.forms);
  const submissionsList = useSelector((state: any) => state.submissions.submissions);
  const [forms, setForms] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    setForms(formsList)
  }, [formsList])
  useEffect(() => {
    setSubmissions(submissionsList)
  }, [submissionsList])
  return (
    <div className={styles.App}>
      <h1>Home Page</h1>
      <h2>Forms</h2>
      <div className={styles.formContainer}>
        {forms?.map((form: any) => (
          <FormCard key={form._id} form={form} />
        ))}
        <AddCard />
      </div>
      <h2>Submissions</h2>
      <div className={styles.formContainer}>
        {submissions?.map((submission: any) => (
          <SubmissionCard key={submission._id} submission={submission} />
        ))}
      </div>
    </div>
  );
}
export default Home;