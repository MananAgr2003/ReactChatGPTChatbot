import { useState } from 'react';
import './App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "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";

const systemMessage = {
  "role": "system",
  "content": "Explain things like you're talking to a software professional with 2 years of experience."
};

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, Welcome To My IDFI Assistant!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prevIsChatOpen) => !prevIsChatOpen);
  };

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages,
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      }).then((data) => {
        return data.json();
      }).then((data) => {
        console.log(data);
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
        }]);
        setIsTyping(false);
      });
  }

  return (
    <div className="App">
      <button onClick={toggleChat} style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '999',
        height: '55px',
        width: '55px',
        backgroundColor : "#ffffff",
        borderRadius : "50%",
      
      }}>
        {isChatOpen ? <img style={{
          height: "25px",
          position:"relative",
          right:"4px",
          top:"2px"
        }} src="https://img.icons8.com/ios-filled/50/000000/x.png" />  : <img style={{
          height: "25px",
          position:"relative",
          right:"4px",
          top:"2px"
        }} src="https://img.icons8.com/ios-filled/50/000000/chat.png" />}
      </button>

      {isChatOpen && (
        <div style={{  position: 'fixed',
        bottom: '100px',
        right: '20px',
        zIndex: '999', height: '400px', width: '340px' }}>
          <MainContainer>
            <ChatContainer style={{
                borderRadius:"15px" 

              }}>
              <MessageList
              style={{
                padding:"5px" ,
                borderRadius:"15px" 


              }}
                scrollBehavior="smooth"
                typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
              >
                {messages.map((message, i) => {
                  console.log(message);
                  return <Message key={i} model={message} style={{
                   
                  }}/>;
                })}
              </MessageList>
              <MessageInput placeholder="Type message here" onSend={handleSend} />
            </ChatContainer>
          </MainContainer>
        </div>
      )}
    </div>
  );
}

export default App;
