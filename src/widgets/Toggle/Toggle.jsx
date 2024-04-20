import React from "react";
import './styles.css'

export const Toggle = ({isVideoEnabled, handleToggleVideo}) => {
    return (
        <>
            <label className="video-toggle" htmlFor="video-toggle">Получать видео:</label>
            <input
                id="video-toggle"
                type="checkbox"
                checked={isVideoEnabled}
                onChange={handleToggleVideo}
            />
        </>
    )
}