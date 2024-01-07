(function() {
  // Create a new style element
  const fontAwesomeLink = document.createElement("link");
  fontAwesomeLink.rel = "stylesheet";
  fontAwesomeLink.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css";
  document.head.appendChild(fontAwesomeLink);
  const style = document.createElement("style");
  style.innerHTML = `
    
    #chat-widget {
      position: fixed;
      top: 50%;
      left: -350px;
      transform: translateY(-50%);
      width: 350px;
      z-index: 9999;
      transition: left 0.5s;
      }
      
      #chat-widget.visible {
      left: 30px;
      }
      
      #chat-container {
      height: 500px;
      border-radius: 10px;
      background-color: #f8f8f8;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      color: #333333;
      }
      
      #chat-title {
      padding: 10px;
      font-weight: bold;
      background-color: #284269;
      color: #ffffff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      }
      
      #chat-messages {
      height: 395px;
      overflow-y: scroll;
      padding: 10px;
      &::-webkit-scrollbar {
        width: 12px; /* Set the width of the scrollbar */
      }
    
      &::-webkit-scrollbar-thumb {
        background-color: #888; /* Set the color of the thumb */
        border-radius: 6px; /* Set the border-radius of the thumb */
        border: 3px solid #555; /* Set the border of the thumb */
      }
    
      &::-webkit-scrollbar-track {
        background-color: #f1f1f1; /* Set the color of the track */
      }
    
      /* Optional: Hide the scrollbar track when not hovering over it */
      &::-webkit-scrollbar-track-piece {
        background-color: transparent;
      }
    
      /* Optional: Change the appearance of the scrollbar corner */
      &::-webkit-scrollbar-corner {
        background-color: #ccc;
      }
      }
      
      .chat-message-container {
      margin-bottom: 10px;
      }
      
      .chat-message-header {
      font-weight: bold;
      }
      
      .chat-message-body {
      margin-top: 5px;
      }
      
      #chat-input-container {
      display: flex;
      align-items: center;
      padding: 10px;
      border-top: 1px solid #d9d9d9;
      width: 280px;
      margin-left: 53px;
      }
      
      #chat-input {
      flex: 1;
      padding: 5px;
      border: none;
      border-radius: 5px;
      margin-right: 5px;
      background-color: #f1f1f1;
      border: 1px solid #d9d9d9;
      width: 50px;
      color: black;
      }
      
      #chat-send {
      font-family: "Open Sans", sans-serif;
      padding: 5px 10px;
      border: none;
      border-radius: 5px;
      background-color: #284269;
      color: #ffffff;
      cursor: pointer;
      }
      
      #chat-toggle {
      font-family: "Open Sans", sans-serif;
      position: fixed;
      bottom: 10px;
      left: 20px;
      z-index: 9999;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      background-color: #2D2926;
      box-shadow: 0px 0px 0px #284269;
      color: white;
      font-weight:lighter;
      font-size: 11px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      opacity: 0.95;transition: background-color 0.3s ease-in-out;
      }
      
      #chat-toggle:hover {
      transform: scale(1.2);
      transition: transform 0.3s ease-in-out;
      }
      
      #chat-toggle i {
      font-size: 30px;
      line-height: 60px;
      }
    
      #loading {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0);
        z-index: 9999;
      }
      
      .spinner {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 5px solid #ccc;
        border-top-color: #666;
        animation: spin 1s infinite linear;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      
      .message {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 16px;
        color: #666;
      }

      #clear-chat {
        position: absolute;
        bottom: 5px;
        left: 8px;
        width:48px;
        height:30px;
        font-size: 10px;
        padding-left:-5px;
      }
      #typing-animation {
        overflow: hidden;
        white-space: nowrap;
        animation: typing 1s steps(14, end), blink-caret 0.2s step-end infinite;
        border-right: 2px solid #284269;
        width: 0;
        display: inline-block;
      }
    
      @keyframes typing {
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }
    
      @keyframes blink-caret {
        from, to {
          border-color: transparent;
        }
        50% {
          border-color: #284269;
        }
      }

      #chat-animation {

        position: absolute;
        bottom : 50px;
        left: 15px;
        background-color: white;
      }
      
      `;

  document.head.appendChild(style);

  // Create chat widget container
  const chatWidgetContainer = document.createElement("div");
  chatWidgetContainer.id = "chat-widget-container";
  document.body.appendChild(chatWidgetContainer);

  // Inject the HTML
  chatWidgetContainer.innerHTML = `
    
    <button id="chat-toggle"><i class="far fa-comment"></i></button>
    <div id="chat-widget">
      <div id="chat-container">
        <div id="chat-title">Welcome To My IDFI BOT!</div>
        <div id="chat-messages"></div>
        <div id="chat-animation"></div>
        <div id="chat-input-container">
          <input id="chat-input" type="text" placeholder="Write your message">
          <button id="chat-send">Send</button>
          <div id="loading">
            <div class="spinner"></div>
            <div class="message">Loading...</div>
          </div>        
        </div>
      </div>
    </div>
      
      `;

  const cache = {};

  const OPENAI_API_KEY = "";
  const OPENAI_API_ENDPOINT =
    "https://api.openai.com/v1/engines/text-davinci-003/completions";

  const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  let chatMessagesData = storedMessages;

  function saveMessagesToLocalStorage(messages) {
    // Save messages to local storage
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }

  const chatToggle = document.getElementById("chat-toggle");
  const chatWidget = document.getElementById("chat-widget");
  const chatContainer = document.getElementById("chat-container");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatSendButton = document.getElementById("chat-send");

  let chatVisible = false;
  let introMessageSent = false;

  chatToggle.addEventListener("click", () => {
    chatVisible = !chatVisible;
    chatWidget.classList.toggle("visible", chatVisible);
    chatToggle.innerText = chatVisible ? "Close" : "Open Chat";
  });

  chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const userInput = chatInput.value.trim();
      if (userInput) {
        addChatMessage("You", userInput);
        sendChatMessage(userInput);
        chatInput.value = "";
      }
    }
  });

  chatSendButton.addEventListener("click", () => {
    const userInput = chatInput.value.trim();
    if (userInput) {
      addChatMessage("You", userInput);
      sendChatMessage(userInput);
      chatInput.value = "";
    }
  });

  function addChatMessage(sender, message) {

    //add a by default message
    

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("chat-message-container");
    const messageHeader = document.createElement("div");
    messageHeader.classList.add("chat-message-header");
    messageHeader.textContent = sender + ":";
    const messageBody = document.createElement("div");
    messageBody.classList.add("chat-message-body");
    messageBody.textContent = message;
    messageContainer.appendChild(messageHeader);
    messageContainer.appendChild(messageBody);
    chatMessages.appendChild(messageContainer);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Save the new message to the local storage
    chatMessagesData.push({ sender, message });
    saveMessagesToLocalStorage(chatMessagesData);
  }
  function top(){
    chatMessages.scrollTop = chatMessages.scrollHeight;


  }

  function sendChatMessage(message) {

    //make chat-messages scroll to bottom
    top();

    const loadingElement = document.getElementById("chat-animation");
    loadingElement.innerHTML =
      '<span id="typing-animation">My IDFI Bot is Thinking....</span>';

    fetch(OPENAI_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Q: ${message}\nA: `,
        max_tokens: 1000,
        temperature: 0.7,
        stop: ["\n"],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
      
        const chatbotResponse = data.choices[0].text.trim();
        addChatMessage("My IDFI Bot", chatbotResponse);
        loadingElement.innerHTML = "";
      })
      .catch((error) => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
        console.error(error);
        addChatMessage(
          "Chat IA",
          "Sorry, I was unable to process your request."
        );
        loadingElement.innerHTML = "";
      });
  }
  window.addEventListener("load", () => {
    if (!introMessageSent) {
      introMessageSent = true;
      const messageContainer = document.createElement("div");
      messageContainer.classList.add("chat-message-container");
      const messageHeader = document.createElement("div");
      messageHeader.classList.add("chat-message-header");
      messageHeader.textContent = "My IDFI Bot:";
      const messageBody = document.createElement("div");
      messageBody.classList.add("chat-message-body");
      messageBody.textContent = "Hello, I'm My IDFI Bot. How can I help you?";
      messageContainer.appendChild(messageHeader);
      messageContainer.appendChild(messageBody);
      chatMessages.appendChild(messageContainer);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    chatMessagesData.forEach((msg) => {
      const messageContainer = document.createElement("div");
      messageContainer.classList.add("chat-message-container");
      const messageHeader = document.createElement("div");
      messageHeader.classList.add("chat-message-header");
      messageHeader.textContent = msg.sender + ":";
      const messageBody = document.createElement("div");
      messageBody.classList.add("chat-message-body");
      messageBody.textContent = msg.message;
      messageContainer.appendChild(messageHeader);
      messageContainer.appendChild(messageBody);
      chatMessages.appendChild(messageContainer);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    
    });
  });
  function clearChat() {
    // Clear chat interface
    chatMessages.innerHTML = "";

    // Clear local storage
    localStorage.removeItem("chatMessages");

    // Reset chatMessagesData
    chatMessagesData = [];

    // Optional: Display a message indicating that the chat has been cleared

    // Optional: Close the chat widget if open
    chatVisible = false;
    chatWidget.classList.remove("visible");
    chatToggle.innerText = "Open Chat";
  }
  const clearChatButton = document.createElement("button");

  clearChatButton.id = "clear-chat";
  clearChatButton.innerText = "Clear";
  clearChatButton.addEventListener("click", clearChat);
  chatWidget.appendChild(clearChatButton);
})();
