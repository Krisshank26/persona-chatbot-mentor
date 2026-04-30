
const personas = {
  anshuman: {
    name: "Anshuman Singh",
    hint: "Founder-style, crisp, and execution-focused.",
    chips: [
      "How should I think about DSA vs projects?",
      "How do I stay consistent while studying?",
      "How should I plan my college journey?"
    ]
  },
  abhimanyu: {
    name: "Abhimanyu Saxena",
    hint: "Candid, practical, and first-principles driven.",
    chips: [
      "What makes a startup succeed?",
      "Should I wait for perfect timing before launching?",
      "How do I think about learning in a fast-changing industry?"
    ]
  },
  kshitij: {
    name: "Kshitij Mishra",
    hint: "Structured, patient, and fundamentals-first.",
    chips: [
      "How should I solve a difficult DSA problem?",
      "Why do I keep making mistakes in interviews?",
      "How can I become stronger in Java?"
    ]
  }
} ; 

// Put your own researched, assignment-specific prompt text here if you want to refine the persona further.
// The backend also contains the same prompts so the browser never needs to know the API key.
const apiEndpoint = "http://localhost:8080/api/chat" ; 

let activePersona = "anshuman";
let messages = [];

const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const typingIndicator = document.getElementById("typingIndicator");
const suggestionChips = document.getElementById("suggestionChips");
const activePersonaName = document.getElementById("activePersonaName");
const activePersonaHint = document.getElementById("activePersonaHint");
const personaButtons = document.querySelectorAll(".persona-tab");

function renderInitialState() {
  messages = [];
  chatWindow.innerHTML = "";
  addAssistantMessage(
    `Hi, I am ${personas[activePersona].name}. Ask me anything, and I will answer in my style.`
  );
  updatePersonaUI();
  renderChips();
}

function updatePersonaUI() {
  activePersonaName.textContent = personas[activePersona].name;
  activePersonaHint.textContent = personas[activePersona].hint;

  personaButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.persona === activePersona);
  });
}

function renderChips() {
  suggestionChips.innerHTML = "";
  personas[activePersona].chips.forEach((chipText) => {
    const button = document.createElement("button");
    button.className = "chip";
    button.type = "button";
    button.textContent = chipText;
    button.addEventListener("click", () => {
      messageInput.value = chipText;
      messageInput.focus();
    });
    suggestionChips.appendChild(button);
  });
}

function addMessage(role, text) {
  const bubble = document.createElement("div");
  bubble.className = `message ${role}`;
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function addUserMessage(text) {
  messages.push({ role: "user", content: text });
  addMessage("user", text);
}

function addAssistantMessage(text) {
  messages.push({ role: "model", content: text });
  addMessage("assistant", text ) ; 
}

function setBusy(isBusy) {
  typingIndicator.classList.toggle("show", isBusy);
  typingIndicator.setAttribute("aria-hidden", String(!isBusy));
  sendButton.disabled = isBusy;
  messageInput.disabled = isBusy;
}

async function sendMessage(text) {
  addUserMessage(text);
  setBusy(true);

  try {
    // Send the full conversation to the backend.
    // The backend applies the persona-specific instructions (system prompt) and uses the server-side API key.
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        personaId: activePersona,
        messages 
      })
    });

    const data = await response.json() ; 

    if (!response.ok) {
      throw new Error(data.error || "Request failed.");
    }

    addAssistantMessage(data.reply);
  } catch (error) {
    addAssistantMessage("Sorry, I could not reach the AI service just now. Please try again in a moment.");
    console.error(error);
  } finally {
    setBusy(false);
    messageInput.focus();
  }
}

personaButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const nextPersona = btn.dataset.persona ; 
    if (nextPersona === activePersona) return;

    activePersona = nextPersona ; 
    renderInitialState() ; 
  });
});

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();
  if (!text || sendButton.disabled) return;

  messageInput.value = "";
  await sendMessage(text);
});

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});

renderInitialState();
