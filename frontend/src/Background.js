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
                { type: 'bot', text: "Hello! Welcome to VentureVisionary! We're here to help you tailor tomorrow's spaces to today's ambitions. To get started, please provide the *location, price, size, buisness type*" }
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

    // const handleGenerateReport = () => {
    //     // Check the value of city and determine which file to download
    //     if (city === 'Dallas') {
    //     // Download Property-Report-Dallas.pdf
    //     window.open('/Property-Report-Dallas.pdf', '_blank');
    //     } else if (city === 'Chicago') {
    //     // Download Property-Report-Chicago.pdf
    //     window.open('/Property-Report-Chicago.pdf', '_blank');
    //     } else {
    //     // Handle other cases or provide a default behavior
    //     console.log("No report available for this city");
    //     }
    // };

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
                            <div className="checkbox-container text-white">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" id="TargetAudience" name="TargetAudience" />
                                    <label htmlFor="TargetAudience" style={{ marginLeft: '10px', fontSize: '20px' }}>Target Audience</label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" id="Advantages" name="Advantages" />
                                    <label htmlFor="Advantages" style={{ marginLeft: '10px', fontSize: '20px' }}>Advantages</label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" id="Disadvantages" name="Disadvantages" />
                                    <label htmlFor="Disadvantages" style={{ marginLeft: '10px', fontSize: '20px' }}>Disadvantages</label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" id="CompetitorInsights" name="CompetitorInsights" />
                                    <label htmlFor="CompetitorInsights" style={{ marginLeft: '10px', fontSize: '20px' }}>Competitor Insights</label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" id="FradulentInsuranceInsights" name="FradulentInsuranceInsights" />
                                    <label htmlFor="FradulentInsuranceInsights" style={{ marginLeft: '10px', fontSize: '20px' }}>Fradulent Insurance Insights</label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" id="ImportantBuyerInformation" name="ImportantBuyerInformation" />
                                    <label htmlFor="ImportantBuyerInformation" style={{ marginLeft: '10px', fontSize: '20px' }}>Important Buyer Information</label>
                                </div>
                                <div className='pt-6 flex items-center justify-center align-items'>
                                    <a href="Property-Report-Dallas.pdf">
                                    <button className="generate-report-btn" onClick={handleGenerateReport}>Generate Report</button>
                                    </a>
                                </div>
                                {/* <button className="generate-report-btn" onClick={handleGenerateReport}>Generate Report</button> */}
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
