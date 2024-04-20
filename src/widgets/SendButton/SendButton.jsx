import React from 'react';
import './styles.css'

export const SendButton = ({ onClick, isLoading }) => {
    return (
        <button className='button-send' onClick={onClick} disabled={isLoading}>
            {isLoading ? 'Обработка...' : 'Отправить'}
        </button>
    );
};