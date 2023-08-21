import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MyDatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from '../Inputs.module.css';
import DeleteInput from '../../DeleteInput/DeleteInput';
import { useState } from 'react';
import { Button } from '@mui/material';
interface DatePickerProps {
    label: string,
    name: string,
    onValueChange?: (name: string, data: string | null) => void | null,
    onDeleteInput?: (name: string) => void | null,
    isWrite: boolean
}
const DatePicker: React.FC<DatePickerProps> = ({ label, name, onValueChange, onDeleteInput, isWrite }) => {
    const [value, setValue] = useState("");
    const valueChangeEvent = (value: any) => {
        setValue(value);
        if (onValueChange) onValueChange(name, value);
    }
    const deleteInput = () => {
        if (onDeleteInput) onDeleteInput(name);
    }
    return (
        <>
            <div className={styles.inputContent} id={name}>
                <label>{label} : </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MyDatePicker onChange={(event) => { valueChangeEvent(event) }} />
                </LocalizationProvider>
                {isWrite && <Button variant="contained" size="medium" onClick={deleteInput}>-</Button>}
            </div >
            <div className={styles.inputOptions}>
            </div>
        </>
    );
}
export default DatePicker;