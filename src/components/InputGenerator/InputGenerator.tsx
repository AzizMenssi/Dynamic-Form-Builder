import React, { useState } from 'react';
import InputText from '../Inputs/InputText/InputText';
import InputNumber from '../Inputs/InputNumber/InputNumber';
import InputEmail from '../Inputs/InputEmail/InputEmail';
import SelectOptions from '../Inputs/SelectOptions/SelectOptions';
import DatePicker from '../Inputs/DatePicker/DatePicker';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import styles from './InputGenerator.module.css';
interface InputGeneratorProps {
    onAddInput: (newInput: any) => void;
    onUpdateInput: (name: string, options: any[]) => void,
    onDeleteInput?: (name: string) => void | null
}
const InputGenerator: React.FC<InputGeneratorProps> = ({ onAddInput, onUpdateInput, onDeleteInput }) => {
    const [selectedType, setSelectedType] = useState<string>('null');
    const [inputLabel, setInputLabel] = useState<string>('');
    const [showButton, setShowButton] = useState<boolean>(false);
    const [inputOptions, setInputOptions] = useState<any[]>([]);
    const genRandonString = () => {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        var charLength = chars.length;
        var result = '';
        for (var i = 0; i < 3; i++) {
            result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }
    const inputId = genRandonString();
    const handleAddInput = () => {
        const newInput = generateInput(selectedType);
        if (newInput) {
            onAddInput({ input: newInput, name: inputId, type: selectedType, label: inputLabel, options: inputOptions });
            setInputLabel('');
            setSelectedType('null');
            setShowButton(false);
        }
    };
    const handleDeleteInput = (name: string) => {
        if (onDeleteInput) onDeleteInput(name);
    };
    const generateInput = (type: string): JSX.Element | null => {
        switch (type) {
            case 'text':
                return <InputText name={inputId} label={inputLabel} onDeleteInput={handleDeleteInput} isWrite={true} />;
            case 'number':
                return <InputNumber name={inputId} label={inputLabel} isWrite={true} />;
            case 'email':
                return <InputEmail name={inputId} label={inputLabel} isWrite={true} />;
            case 'select':
                return <SelectOptions name={inputId} label={inputLabel} options={inputOptions} onUpdateOptions={handleSaveOptions} isWrite={true} />;
            case 'date':
                return <DatePicker name={inputId} label={inputLabel} isWrite={true} />;
            default:
                return null;
        }
    };
    const handleSaveOptions = (name: string, options: any[]) => {
        setInputOptions(options);
        onUpdateInput(name, options);
    };
    return (
        <div className={styles.inputGenerator}>
            <TextField
                type="text"
                label="Input Label"
                value={inputLabel}
                onChange={(e) => setInputLabel(e.target.value)}
                size="small"
                required
            />
            <Select value={selectedType} onChange={(e) => { setSelectedType(e.target.value); setShowButton(true); }}>
                <MenuItem value="null">Select Type</MenuItem>
                <MenuItem value="text">Text Input</MenuItem>
                <MenuItem value="number">Number Input</MenuItem>
                <MenuItem value="email">Email Input</MenuItem>
                <MenuItem value="select">Select Options</MenuItem>
                <MenuItem value="date">Date Picker</MenuItem>
            </Select>
            {showButton && <Button variant="contained" size="medium" onClick={handleAddInput}>Add Input</Button>}
        </div>
    );
};
export default InputGenerator;