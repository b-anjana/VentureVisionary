import React, { useState, useRef } from 'react';
import './styles/Chatbox.css';
import Submit from './assets/Arrow.svg';

const Chatbox = ({ onMessageSubmit }) => {
    const [inputValue, setInputValue] = useState('');
    const textareaRef = useRef(null);

    const adjustTextareaHeight = (initialHeight) => {
        if (textareaRef.current) {
            textareaRef.current.style.height = initialHeight ? '40px' : 'auto';
            if (!initialHeight) {
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        adjustTextareaHeight(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputValue);
        onMessageSubmit(inputValue);
        setInputValue('');
        adjustTextareaHeight(true);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    return (
        <form className="chatbox" onSubmit={handleSubmit}>
            <textarea
                placeholder="Ask Anything..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={1}
                ref={textareaRef}
            />
            <button type="submit" disabled={!inputValue.trim()}>
                <img src={Submit} alt="Send message" />
            </button>
        </form>
    );
};

export default Chatbox;
