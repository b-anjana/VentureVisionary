import React, { useState, useEffect, useRef } from 'react';
import './styles/Background.css';
import BotMessage from './BotMessage';
import UserMessage from './UserMessage';
import Chatbox from './Chatbox';

const Background = () => {
    const [messages, setMessages] = useState([]);
    const [askMetrics, setAskMetrics] = useState(true);
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        if (askMetrics) {
            setMessages([
                ...messages,
                { type: 'bot', text: "Bot: Please provide the following metrics: location, price, size, and business type." }
            ]);
        }
    }, [askMetrics]);

    const handleMessageSubmit = (userMessage) => {
        if (askMetrics) {
            setAskMetrics(false);
            setMessages([
                ...messages,
                { type: 'user', text: userMessage },
                { type: 'bot', text: "Bot: Now please select from the following options:" }
            ]);
        } else {
            const updatedMessages = [...messages, { type: 'user', text: userMessage }];
            setMessages(updatedMessages);
        }
    };

    const handleGenerateReport = () => {
        // Handle generating report functionality here
        console.log("Report generated!");
    };

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="background">
            <div className="chat-container">
                <div className="chatbox-container">
                    <Chatbox onMessageSubmit={handleMessageSubmit} />
                </div>
                <div className="messages-container">
                    <div className="messages">
                        {messages.map((message, index) =>
                            message.type === 'user' ? (
                                <UserMessage key={index} text={message.text} />
                            ) : (
                                <BotMessage key={index} text={message.text} />
                            )
                        )}
                        {!askMetrics && (
                            <div className="checkbox-container">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" id="TargetAudience" name="TargetAudience" />
                                    <label htmlFor="TargetAudience" style={{ marginLeft: '10px', fontFamily: 'Times', fontSize: '20px' }}>Target Audience</label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" id="Advantages" name="Advantages" />
                                    <label htmlFor="Advantages" style={{ marginLeft: '10px', fontFamily: 'Times', fontSize: '20px' }}>Advantages</label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" id="Disadvantages" name="Disadvantages" />
                                    <label htmlFor="Disadvantages" style={{ marginLeft: '10px', fontFamily: 'Times', fontSize: '20px' }}>Disadvantages</label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" id="CompetitorInsights" name="CompetitorInsights" />
                                    <label htmlFor="CompetitorInsights" style={{ marginLeft: '10px', fontFamily: 'Times', fontSize: '20px' }}>Competitor Insights</label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" id="FradulentInsuranceInsights" name="FradulentInsuranceInsights" />
                                    <label htmlFor="FradulentInsuranceInsights" style={{ marginLeft: '10px', fontFamily: 'Times', fontSize: '20px' }}>Fradulent Insurance Insights</label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" id="ImportantBuyerInformation" name="ImportantBuyerInformation" />
                                    <label htmlFor="ImportantBuyerInformation" style={{ marginLeft: '10px', fontFamily: 'Times', fontSize: '20px' }}>Important Buyer Information</label>
                                </div>
                                <button className="generate-report-btn" onClick={handleGenerateReport}>Generate Report</button>
                            </div>
                        )}
                        <div ref={endOfMessagesRef} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Background;
