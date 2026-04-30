# Persona-Based AI Chatbot

A simple responsive chat app with three personas:
- Anshuman Singh
- Abhimanyu Saxena
- Kshitij Mishra

## Structure
- `client/index.html` — UI
- `client/styles.css` — responsive styling
- `client/script.js` — persona switching, suggestion chips, chat logic
- `server/server.js` — Express + Gemini API proxy
- `.env.example` — environment variable template

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Add your Gemini key to `.env`:
   ```bash
   GEMINI_API_KEY=your_actual_key_here
   ```

4. Start the server:
   ```bash
   npm start
   ```


## Notes
- The API key is read on the server from `GEMINI_API_KEY` and is never exposed in the browser.
- Each persona has its own prompt in `server.js` and the conversation resets when the persona changes.
- Replace the prompt placeholders with your own researched notes if your assignment requires extra authenticity.

## Assignment reminder
The provided assignment asks for three distinct persona prompts, few-shot examples, a typing indicator, suggestion chips, mobile responsiveness, and a secure key setup. This project includes those pieces in a clean starter form. fileciteturn0file0
