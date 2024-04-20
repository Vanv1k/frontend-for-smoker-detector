import React, { useState } from 'react';
import { InputForm } from "../../widgets/InputForm/InputForm"
import { SendButton } from '../../widgets/SendButton/SendButton';
import './styles.css'

export const MainPage = () => {

    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);


    const handleFileChange = (selectedFile) => {
        setFile(selectedFile);
    };

    const handleSendClick = async () => {
        if (!file) {
            console.log('Файл не выбран');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://9db5-107-189-7-49.ngrok-free.app/upload-image/', {
                method: 'POST',
                body: formData
            });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setFileUrl(url);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="main-container">
            <div className="input-container">
                <InputForm onFileChange={handleFileChange}/>
                <SendButton onClick={handleSendClick}/>
            </div>
            {fileUrl && <div className='image-container'><img className='image' src={fileUrl} alt="Uploaded Image" /></div>}
        </div>
    )
}