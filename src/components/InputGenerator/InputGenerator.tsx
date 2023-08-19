import React, { useState } from 'react';
interface InputGeneratorProps {
    onAddInput: (newInput: Input) => void;
}
interface Input {
    name: string;
    type: string;
}
const InputGenerator: React.FC<InputGeneratorProps> = ({ onAddInput }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('text');
    const handleAddInput = () => {
        if (name.trim() !== '') {
            onAddInput({ name, type });
            setName('');
            setType('text');
        }
    };
    return (
        <div>
            <input
                type="text"
                placeholder="Input Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="email">Email</option>
                {/* Add more input types as needed */}
            </select>
            <button onClick={handleAddInput}>Add</button>
        </div>
    );
};
export default InputGenerator;