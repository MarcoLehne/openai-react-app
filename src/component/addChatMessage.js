function addChatMessage({ chatMessages }) {

    return (
        chatMessages.map((message, i) => {
            let rows = Math.ceil(message.message.length / 32).toString()
            return <div key={i} name={message.promptOrResponse}>
                <textarea name={message.promptOrResponse} rows={rows} cols="30" readonly='true'>
                        {message.message}
                        </textarea>
                    </div>
        })
    );
}

export default addChatMessage;