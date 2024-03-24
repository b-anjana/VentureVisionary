import React, { useState } from 'react';
import './styles/Message.css';
import './styles/UserMessage.css';

const UserMessage = ({text}) => {
    return (
        <div className="user-message-container">
            <div className="user-message">{text}</div>
            <div className='fill'></div>
        </div>

    );
};

export default UserMessage;