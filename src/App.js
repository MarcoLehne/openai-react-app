import './App.css';
import AddChatMessage from './component/AddChatMessage';
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
            return [...prevMessages, { 'message': prompt , 'promptOrResponseOrError': 'prompt'}]
        })
        newPrompt.current.value = null;
        
        // #2 send the user input to the openai api
        let modelName = model.current.value === "davinci" ? "text-davinci-003" : "babbage";
        // prevents another user input before API response is there
        sendButton.current.disabled = true;
        openai.createCompletion({
            "model": modelName,
            "prompt": prompt,
            "max_tokens": 2048,
        }).then(response => {

            // #3 add the openai response to chat history
            setChatMessages(prevMessages => {
                sendButton.current.disabled = false;
                if (prevMessages.length === 20) {
                  prevMessages = prevMessages.slice(1);
                }
                return [...prevMessages, { 'message': response.data.choices[0].text.trim(), 'promptOrResponseOrError':'response'}]
            })

        }).catch(error => {

          // #3 add an error to chat history
          setChatMessages(prevMessages => {
            sendButton.current.disabled = false;
            if (prevMessages.length === 20) {
              prevMessages = prevMessages.slice(1);
            }
            return [...prevMessages, { 'message': error, 'promptOrResponseOrError':"error"}]
          })
        })
    }

    // this handles scrolling to an empty bottom div
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    return (
        <div id='main-div'>
            <h1 id='headline'>ChatGPT Web App</h1>
            <div id='chat-history'>
                {AddChatMessage({ chatMessages })}
                <div id='dummy' ref={bottomRef} />
            </div>
            <div id='input-div'>
                <textarea rows='2' cols='40' name='comment' id='userinput' ref={newPrompt} />
                <select ref={ model }>
                    <option value='davinci'>Davinci</option>
                    <option value='babbage'>babbage</option>
                </select>
                <button type='button' value='Send' onClick={handleSendButtonClick} ref={sendButton}>Send</button>
            </div>
        </div>
    );
}

export default ChatGPTApp;