import React from 'react';
import './styles.css'

export const InputForm = ({ onFileChange }) => {
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        onFileChange(selectedFile);
    };

    return (
        <div>
            <h3 className='head'>Прикрепите файл</h3>
            <input className="input-form" type="file" onChange={handleFileChange} />
        </div>
    );
};