import React from 'react';
import './styles.css'

export const SendButton = ({ onClick }) => {
    return (
        <button className='button-send' onClick={onClick}>Отправить</button>
    );
}