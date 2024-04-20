import React, { useState, useEffect } from 'react';
import { InputForm } from "../../widgets/InputForm/InputForm"
import { SendButton } from '../../widgets/SendButton/SendButton';
import { Toggle } from '../../widgets/Toggle/Toggle';
import './styles.css'

export const MainPage = () => {

    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(false);

    // useEffect(() => {
    //     if (isVideoEnabled) {
    //         const pollingInterval = setInterval(() => {
    //             fetchVideo();
    //         }, 100000);
    //         return () => clearInterval(pollingInterval); 
    //     } else {
    //         setFileUrl(null);
    //         setIsLoading(false);
    //     }
        
    // }, [isVideoEnabled]);

    useEffect(()=> {
        if (isVideoEnabled){
            fetchVideo();
        } else {
            setIsVideo(false)
            setFileUrl(null)
        }
    },[isVideoEnabled])

    const fetchVideo = () => {
        setIsVideo(true)
        setFileUrl('https://9db5-107-189-7-49.ngrok-free.app/get-video/');
    };


    const handleFileChange = (selectedFile) => {
        setFile(selectedFile);
    };

    const handleSendClick = async () => {
        if (!file) {
            console.log('Файл не выбран');
            return;
        }
        setIsVideo(false);
        setIsLoading(true);
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
        } finally {
            setIsLoading(false); 
        }
    };

    const handleToggleVideo = () => {
        setIsVideoEnabled(prevState => !prevState);
    };

    return (
        <div className="main-container">
            <div className="input-container">
                <InputForm onFileChange={handleFileChange}/>
                <SendButton onClick={handleSendClick} isLoading={isLoading}/>
                <Toggle className="toggle" isVideoEnabled={isVideoEnabled} handleToggleVideo={handleToggleVideo}/>
            </div>
            {fileUrl && (isVideo ? (
                <div className='image-container video-container'>
                    <video className='video' controls>
                        <source src={fileUrl} type='video/mp4' />
                    </video>
                </div>
            ) : (<div className='image-container'><img className='image' src={fileUrl} alt="Uploaded Image" /></div>))}
        </div>
    )
}