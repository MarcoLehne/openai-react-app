import './App.css';
import addChatMessage from './component/addChatMessage';
import React, { useState,useRef, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
    organization: "org-G0vPUZ7Xa0N5uMcjYedIVzHX",
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

function ChatGPTApp() {

    const [chatMessages, setChatMessages] = useState([]);
    const newPrompt = useRef();
    const model = useRef();
    const bottomRef = useRef(null);
    const sendButton = useRef();

    function handleSendButtonClick(e) {

        // #1 add the user input to the chat div
        const prompt = newPrompt.current.value;
        if (prompt === '') return;
        setChatMessages(prevMessages => {
            return [...prevMessages, { 'message': prompt , 'promptOrResponse': 'prompt'}]
        })
        
        newPrompt.current.value = null;
        
        // #3 send the user input to the openai api
        let modelName = model.current.value === "davinci" ? "text-davinci-003" : "text-davinci-003";
        sendButton.current.disabled = true;
        openai.createCompletion({
            "model": modelName,
            "prompt": prompt,
            "max_tokens": 2048,
        }).then(response => {
            setChatMessages(prevMessages => {
                sendButton.current.disabled = false;

                return [...prevMessages.slice(0,19), { 'message': response.data.choices[0].text.trim(), 'promptOrResponse':'response'}]
            })
        }).catch(error => {
            sendButton.current.disabled = false;
            console.log(error);
            console.log(modelName);
        })

        // #4 block new user input until the answer is received
        // #4 post the answer from chat gpt to the chat window
    }

    // this handles scrolling to an empty bottom div
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    return (
        <div id='main-div'>
            <h1 id='headline'>ChatGPT Web App</h1>
            <div id='history'>
                {addChatMessage({ chatMessages })}
                <div id='dummy' ref={bottomRef} />
            </div>
            <div id='current-IO'>
                <textarea rows='3' cols='40' name='comment' id='userinput' ref={newPrompt} />
                <select ref={model }>
                    <option value='davinci'>Davinci</option>
                    <option value='babbage'>babbage</option>
                </select>
                <button type='button' value='Send' onClick={handleSendButtonClick} ref={sendButton}>Send</button>
            </div>
        </div>
    );
}

export default ChatGPTApp;
