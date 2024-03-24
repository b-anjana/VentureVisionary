import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './styles/Message.css';
import './styles/BotMessage.css';


const BotMessage = ({ text }) => {
    useEffect(() => {
        console.log('Effect ran');
    }, [text]);

    return (
        <div className="bot-message-container">
            
            <div className="bot-message">
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>
        </div>
    );
};

export default BotMessage;
