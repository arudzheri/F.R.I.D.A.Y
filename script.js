window.onload = () => {
  eel.start_display_loop();
};

// Add chat bubbles
eel.expose(add_chat_message);
function add_chat_message(input, response) {
  const container = document.getElementById("chat-container");

  const inputBubble = document.createElement("div");
  inputBubble.className = "chat-bubble user";
  inputBubble.innerText = "🧑 You: " + input;

  const responseBubble = document.createElement("div");
  responseBubble.className = "chat-bubble bot";
  responseBubble.innerText = "🤖 FRIDAY: " + response;

  container.appendChild(inputBubble);
  container.appendChild(responseBubble);
  container.scrollTop = container.scrollHeight;
}

// Animated typing
eel.expose(animate_text);
function animate_text(elementId, text) {
  const el = document.getElementById(elementId);
  let index = 0;
  el.innerText = "";

  function type() {
    if (index < text.length) {
      el.innerText += text.charAt(index);
      index++;
      setTimeout(type, 25);
    }
  }

  type();
}

// Voice input (Web Speech API)
function startVoiceInput() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function(event) {
    const voiceCommand = event.results[0][0].transcript;
    console.log("🎤 Voice Input:", voiceCommand);
    eel.process_voice_input(voiceCommand);
  };

  recognition.onerror = function(event) {
    console.error("Speech recognition error:", event.error);
  };

  recognition.start();
}
