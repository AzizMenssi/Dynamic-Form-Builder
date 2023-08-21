import { MenuItem, Select, SelectChangeEvent, TextField, Button } from "@mui/material";
import { useState } from "react";
import styles from '../Inputs.module.css';
interface Option {
    id: string, name: string, value: string
}
interface SelectOptionsProps {
    label: string,
    name: string,
    options: Option[],
    onUpdateOptions: (name: string, options: Option[]) => void,
    onValueChange?: (name: string, data: string | null) => void | null,
    onDeleteInput?: (name: string) => void | null,
    isWrite: boolean
}
const SelectOptions: React.FC<SelectOptionsProps> = ({ label, name, options, onUpdateOptions, onValueChange, onDeleteInput, isWrite }) => {
    const [value, setValue] = useState('');
    const [currentOption, setCurrentOption] = useState<string>('');
    const [currentOptions, setCurrentOptions] = useState<any[]>(options);
    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
        if (onValueChange) onValueChange(name, event.target.value);
    };
    const deleteInput = () => {
        if (onDeleteInput) onDeleteInput(name);
    }
    const genRandonString = () => {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        var charLength = chars.length;
        var result = '';
        for (var i = 0; i < 3; i++) {
            result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }
    const handleAddOption = () => {
        let optionId = genRandonString();
        setCurrentOptions([...currentOptions, { optionId: optionId, value: currentOption, name: currentOption }]);
        onUpdateOptions(name, [...currentOptions, { optionId: optionId, value: currentOption, name: currentOption }]);
        setCurrentOption('');
    };
    const handleDeleteOption = (optionId: string) => {
        let filteredOptions = currentOptions.filter((option: any) => option.optionId !== optionId);
        setCurrentOptions(filteredOptions);
        onUpdateOptions(name, filteredOptions);
    };
    return (
        <>
            <div className={styles.inputContent} id={name}>
                <label>{label} : </label>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={value}
                    onChange={handleChange}
                    sx={{ width: 200 }}
                    size="small"
                >
                    {currentOptions.map((option: Option, index: number) => (
                        <MenuItem key={index} value={option.value}>{option.name}</MenuItem>
                    ))}
                </Select>
                {isWrite && <Button variant="contained" size="medium" onClick={deleteInput}>-</Button>}
            </div >
            <div className={styles.inputOptions}>
                {isWrite &&
                    <div>
                        <div className={styles.selectOptions}>
                            <label>Add Option :</label>
                            <TextField size="small" id="outlined-basic" label="Option" variant="outlined" value={currentOption} onChange={(e) => { setCurrentOption(e.target.value) }} />
                            <Button variant="contained" size="medium" onClick={handleAddOption}>+</Button>
                        </div>
                        <div className={styles.optionContainer}>
                            {currentOptions.map((option: any) => (
                                <div className={styles.selectOptions} key={option.optionId}>
                                    <TextField size="small" id="outlined-basic" value={option.name} />
                                    <Button variant="contained" size="medium" onClick={() => handleDeleteOption(option.optionId)}>-</Button>
                                </div>
                            ))}
                        </div>
                    </div>}
            </div>
        </>
    );
}
export default SelectOptions;