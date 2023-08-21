import { Button, TextField } from "@mui/material";
import styles from '../Inputs.module.css';
import { useState } from "react";
interface InputNumberProps {
    label: string,
    name: string,
    onValueChange?: (name: string, value: any | null) => void | null,
    onDeleteInput?: (name: string) => void | null,
    isWrite: boolean
}
const InputNumber: React.FC<InputNumberProps> = ({ label, name, onValueChange, onDeleteInput, isWrite }) => {
    const [value, setValue] = useState("");
    const valueChangeEvent = (value: string) => {
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
                <TextField size="small"
                    id="outlined-basic" label={label} variant="outlined" type="number" onChange={(event) => { valueChangeEvent(event.target.value) }}/>
                {isWrite && <Button variant="contained" size="medium" onClick={deleteInput}>-</Button>}
            </div >
            <div className={styles.inputOptions}>
            </div>
        </>
    );
}
export default InputNumber;