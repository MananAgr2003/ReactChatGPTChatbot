import { useState, useEffect } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator
} from '@chatscope/chat-ui-kit-react';

const API_KEY = "";

const systemMessage = {
  "role": "system",
  "content": "Explain things like you're talking to a software professional with 2 years of experience."
};
const initialSystemMessage = {
  "role": "system",
  "content": "Hey! Welcome to my IDFi Bot. How can I help you today?"
};

function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    return storedMessages ? JSON.parse(storedMessages) : [initialSystemMessage];
  });
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

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
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

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

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
        zIndex: '999', height: '400px', width: '350px' , overflow:"hidden" }}>
          <MainContainer style={{
            display:"flex",
            flexDirection:"column",
            
          }}>
         
            
            <ChatContainer style={{
                borderRadius:"15px" 
              }}>
               
              <MessageList
                style={{
                  borderRadius:"15px" 
                }}
                scrollBehavior="smooth"
                typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
              >
                 <div style={{
            backgroundColor:"lightblue",
            padding:"15px",
            margin:"4px",
            fontSize:"16px",
            borderRadius:"15px"
          }}>
              Hello Welcome to My IDFI Bot How Can I Help You Today?
            </div>
                
                {messages.map((message, i) => {
                  console.log(message);
                  return <Message key={i} model={message} style={{
                  }}/>;
                })}
              </MessageList>
              <MessageInput placeholder="Type message here" onSend={handleSend} />
            </ChatContainer>
            <div style={{ textAlign: "center", marginTop: "10px" , position:"absolute" , bottom:"9px" ,left : "5px", zIndex:"9999" , width:"30px"}}>
              <button onClick={clearChat} style={{
                backgroundColor: "lightblue",
                color: "black",
                padding: "2px",
                borderRadius: "5px",
                cursor: "pointer",
                width:"30px",
                 fontSize:"10px",
                  height:"30px"
              }}>
                Clear
              </button>
            </div>
          </MainContainer>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
