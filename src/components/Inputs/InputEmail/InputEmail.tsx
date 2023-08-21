import { Button, TextField } from "@mui/material";
import styles from '../Inputs.module.css';
import { useState } from "react";
interface InputEmailProps {
    label: string,
    name: string,
    onValueChange?: (name: string, data: string | null) => void | null,
    onDeleteInput?: (name: string) => void | null,
    isWrite: boolean
}
const InputEmail: React.FC<InputEmailProps> = ({ label, name, onValueChange, onDeleteInput, isWrite }) => {
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
                <TextField size="small" onChange={(event) => { valueChangeEvent(event.target.value) }}
                    id="outlined-basic" label={label} variant="outlined" type="email" />
                {isWrite && <Button variant="contained" size="medium" onClick={deleteInput}>-</Button>}
            </div >
            <div className={styles.inputOptions}>
            </div>
        </>
    );
}
export default InputEmail;