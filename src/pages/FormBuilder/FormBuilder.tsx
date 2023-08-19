import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './FormBuilder.module.css';
import InputGenerator from '../../components/InputGenerator/InputGenerator';
import { useDispatch } from 'react-redux';
import { createForm, updateForm } from '../../redux/actions/formActions'
interface FormEditorProps {
    form: any | null;
    onSave: (formData: any) => void;
}
interface InputGeneratorProps {
    onAddInput: (newInput: Input) => void;
}
interface Input {
    name: string;
    type: string;
}
const FormBuilder: React.FC = () => {
    const { formId } = useParams();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<any | null>({} || null);
    const [formInputs, setFormInputs] = useState<Input[]>([]);
    useEffect(() => {
        console.log(formId)
        if (formId) {
            // Fetch existing form for editing
            //   apiService.fetchForm(formId)
            //     .then((response) => {
            //       setForm(response.data); // Adjust this based on your API response format
            //     })
            //     .catch((error) => {
            //       // Handle error
            //     });
        }
    }, [formId]);
    const handleSaveClick = () => {
        if (formData.id === 0) {
            dispatch(createForm(formData));
        } else {
            dispatch(updateForm(formData.id, formData));
        }
    };
    const handleAddInput = (newInput: Input) => {
        setFormInputs([...formInputs, newInput]);
    };
    return (
        <div className={styles.App}>
            <h1>{formId ? 'Edit Form Page' : 'Create Form Page'}</h1>
            <form>
                {formInputs.map((input, index) => (
                    <div key={index}>
                        <label>{input.name}</label>
                        <input type={input.type} />
                    </div>
                ))}
            </form>
            <InputGenerator onAddInput={handleAddInput} />
            <button onClick={handleSaveClick}>Save Form</button>
        </div>
    );
};
export default FormBuilder;