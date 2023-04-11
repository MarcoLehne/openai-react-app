
function AddChatMessage({ chatMessages }) {

    return (
        chatMessages.map((message, i) => {

            if (message.promptOrResponseOrError === "error") {
                return <div key={i} name={message.promptOrResponseOrError}>
                            <h2>There was an error. The error message <br/>reads "{message.message.message}". <br/>
                            Babbage implementation is not working properly <br/>yet, please try again with Davinci as 
                            the model.                    
                            </h2>
                        </div>
            } else {

                // calculate size of message box
                let rows = Math.ceil(message.message.length / 32);
                rows += (message.message.match(/\n/gi)||[]).length;
                rows = rows.toString();

                return <div key={i} name={message.promptOrResponseOrError}>
                            <textarea name={message.promptOrResponseOrError} rows={rows} cols="30" readOnly={true} value={message.message}/>
                        </div>
            }
        })
    );
}

export default AddChatMessage;