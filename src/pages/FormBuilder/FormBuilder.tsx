import React, { useState, useEffect, ReactNode } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from './FormBuilder.module.css';
import InputGenerator from '../../components/InputGenerator/InputGenerator';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { pushForm, updateForm } from '../../redux/slices/formSlice'
import { pushSubmission } from '../../redux/slices/submissionSlice'
import { useNavigate } from 'react-router-dom';
import { TextField } from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import { useSelector } from 'react-redux';
import InputText from '../../components/Inputs/InputText/InputText';
import InputNumber from '../../components/Inputs/InputNumber/InputNumber';
import InputEmail from '../../components/Inputs/InputEmail/InputEmail';
import SelectOptions from '../../components/Inputs/SelectOptions/SelectOptions';
import DatePicker from '../../components/Inputs/DatePicker/DatePicker';
import { FormHelperText } from '@mui/joy';
import FormsApiService from '../../services/forms.api.service';
import SubmissionsApiService from '../../services/submissions.api.service';
import { selectFormById } from '../../redux/selectors/selectorById';
const FormBuilder: React.FC = () => {
    const { _id } = useParams();
    const getFormById: any = useSelector(selectFormById);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formContent, setFormContent] = useState<any[]>([]);
    const [formName, setFormName] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    let pageTitle = '';
    let buttonTitle = '';
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const action = queryParams.get('action');
    let isWrite = true;
    switch (action) {
        case 'edit':
            pageTitle = 'Edit Form Page';
            buttonTitle = 'Save Form';
            break;
        case 'create':
            pageTitle = 'Create Form Page';
            buttonTitle = 'Create Form';
            break;
        case 'view':
            pageTitle = 'View Form Page';
            buttonTitle = 'Submit Form';
            isWrite = false;
            break;
    }
    useEffect(() => {
        if (_id) {
            const formToEdit = getFormById(_id);
            if (formToEdit) {
                setFormName(formToEdit.formName);
                setFormDescription(formToEdit.formDescription);
                let formContentRN: any = [];
                formToEdit.formContent.forEach((input: any) => {
                    formContentRN.push({ input: generateReactNodeInput(input.fieldType, input.fieldLabel, input.fieldName, input.fieldOptions), name: input.fieldName, type: input.fieldType, label: input.fieldLabel, options: input.fieldOptions })
                })
                setFormContent(formContentRN);
            }
        }
    }, [_id]);
    const generateReactNodeInput = (type: string, label: string, name: string, options: any): JSX.Element | null => {
        switch (type) {
            case 'text':
                return <InputText label={label} name={name} onValueChange={handleValueChange} onDeleteInput={handleDeleteInput} isWrite={isWrite} />;
            case 'number':
                return <InputNumber label={label} name={name} onValueChange={handleValueChange} onDeleteInput={handleDeleteInput} isWrite={isWrite} />;
            case 'email':
                return <InputEmail label={label} name={name} onValueChange={handleValueChange} onDeleteInput={handleDeleteInput} isWrite={isWrite} />;
            case 'select':
                return <SelectOptions label={label} name={name} options={options} onUpdateOptions={handleSaveOptions} onValueChange={handleValueChange} onDeleteInput={handleDeleteInput} isWrite={isWrite} />;
            case 'date':
                return <DatePicker label={label} name={name} onValueChange={handleValueChange} onDeleteInput={handleDeleteInput} isWrite={isWrite} />;
            default:
                return null;
        }
    };
    const handleValueChange = (input_name: string, value: string | null) => {
        setFormContent((prevFormContent) => {
            const indexToUpdate = prevFormContent.findIndex((input: any) => input.name === input_name);
            if (indexToUpdate !== -1) {
                const updatedInput = {
                    ...prevFormContent[indexToUpdate],
                    value: value
                };
                const updatedFormContent = [
                    ...prevFormContent.slice(0, indexToUpdate),
                    updatedInput,
                    ...prevFormContent.slice(indexToUpdate + 1)
                ];
                return updatedFormContent;
            }
            return prevFormContent;
        });
    };
    const handleSaveOptions = (name: string, options: any[]) => {
        handleUpdateInput(name, options);
    };
    const handleSaveClick = () => {
        const nameHasError = formName.trim() === '';
        const descriptionHasError = formDescription.trim() === '';
        setNameError(nameHasError);
        setDescriptionError(descriptionHasError);
        if (!nameHasError && !descriptionHasError) {
            let formDataToSave;
            if (!_id || isWrite) {
                const formStructure = formContent.map((inputComponent: any) => {
                    return {
                        fieldName: inputComponent.name,
                        fieldLabel: inputComponent.label,
                        fieldType: inputComponent.type,
                        fieldOptions: inputComponent.options || [],
                    };
                });
                formDataToSave = {
                    formName: formName,
                    formDescription: formDescription,
                    formContent: formStructure,
                };
            } else {
                let formStructure = formContent.reduce((acc, curr) => {
                    acc[curr.label] = curr.value;
                    return acc;
                }, {});
                formDataToSave = {
                    formId: _id,
                    data: formStructure
                }
            }
            if (!_id) {
                createFormAPI(formDataToSave);
            } else {
                if (isWrite) {
                    updateFormAPI(_id, formDataToSave);
                } else {
                    submitFormAPI(formDataToSave);
                }
            }
            navigate('/');
        }
    };
    const handleAddInput = (newInput: ReactNode) => {
        setFormContent([...formContent, newInput]);
    };
    const handleDeleteInput = (name: string) => {
        setFormContent(prevFormContent => {
            const updatedFormContent = prevFormContent.filter(
                input => input.name !== name
            );
            return updatedFormContent;
        });
    };
    const handleUpdateInput = (name: string, options: any[]) => {
        setFormContent((prevFormContent) => {
            const indexToUpdate = prevFormContent.findIndex((input: any) => input.name === name);
            if (indexToUpdate !== -1) {
                const updatedInput = {
                    ...prevFormContent[indexToUpdate],
                    options: options
                };
                const updatedFormContent = [
                    ...prevFormContent.slice(0, indexToUpdate),
                    updatedInput,
                    ...prevFormContent.slice(indexToUpdate + 1)
                ];
                return updatedFormContent;
            }
            return prevFormContent;
        });
    };
    const handleDragStart = (event: any, index: number) => {
        event.dataTransfer.setData('text/plain', index);
    };
    const handleDragOver = (event: any) => {
        event.preventDefault();
    };
    const handleDrop = (event: any) => {
        event.preventDefault();
        const sourceIndex = event.dataTransfer.getData('text/plain');
        const targetIndex = event.target.getAttribute('data-index');
        if (sourceIndex !== targetIndex) {
            const updatedFormContent = [...formContent];
            const [draggedItem] = updatedFormContent.splice(sourceIndex, 1);
            updatedFormContent.splice(targetIndex, 0, draggedItem);
            setFormContent(updatedFormContent);
        }
    };
    const createFormAPI = async (form: any) => {
        try {
            const forms = await FormsApiService.createForm(form).then((res: any) => {
                //@ts-ignore
                dispatch(pushForm(res.data));
            }).catch((error: any) => {
                console.error(error);
            });
            return forms;
        } catch (error) {
            throw error;
        }
    }
    const updateFormAPI = async (formId: string, form: any) => {
        try {
            const forms = await FormsApiService.updateForm(formId, form).then((res: any) => {
                //@ts-ignore
                dispatch(updateForm(res.data));
            }).catch((error: any) => {
                console.error(error);
            });
            return forms;
        } catch (error) {
            throw error;
        }
    }
    const submitFormAPI = async (form: any) => {
        try {
            const forms = await SubmissionsApiService.createSubmission(form);
            //@ts-ignore
            dispatch(pushSubmission(forms.data));
            return forms;
        } catch (error) {
            throw error;
        }
    }
    return (
        <div className={styles.formbuilder}>
            <h1>{pageTitle}</h1>
            <form className={styles.form}>
                <TextField size="small" onChange={(event) => { setFormName(event.target.value); setNameError(false); }}
                    id="outlined-basic" label="Form Name" variant="outlined" value={formName} error={nameError}
                    helperText={nameError ? 'Form name is required' : ''} />
                <Textarea placeholder="Form Description" variant="outlined" onChange={(event) => { setFormDescription(event.target.value); setDescriptionError(false); }} value={formDescription} error={descriptionError}
                />
                <FormHelperText className={styles.textarea}>{descriptionError ? 'Form description is required' : ''}</FormHelperText>
                {formContent.map((object, index) => (
                    object && <div className={styles.input} key={index} draggable
                        onDragStart={(event) => handleDragStart(event, index)}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        data-index={index}>{object.input}</div>
                ))}
            </form>
            {isWrite && <InputGenerator onAddInput={handleAddInput} onUpdateInput={handleUpdateInput} onDeleteInput={handleDeleteInput} />}
            <Button variant="contained" size="medium" onClick={handleSaveClick}>{buttonTitle}</Button>
        </div>
    );
};
export default FormBuilder;