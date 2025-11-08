# VibeXCraft AI Copilots Backend Server

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables (optional):**
   ```bash
   # Create a .env file in the server directory
   # The API key is already hardcoded as fallback, but you can override it:
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-pro
   PORT=3001
   ```

3. **Start the server:**
   ```bash
   npm start
   # or for development:
   npm run dev
   ```

## API Endpoints

All endpoints are prefixed with `/api/copilots/`

- `POST /api/copilots/code` - Code Copilot (uses Gemini API)
- `POST /api/copilots/meeting` - Meeting Copilot (uses Gemini API)
- `POST /api/copilots/tutor` - Tutor Copilot (uses Gemini API)
- `POST /api/copilots/design` - Design Copilot (uses Gemini API)
- `POST /api/copilots/workflow` - Workflow Copilot (uses Gemini API)
- `POST /api/agent/gemini` - Gemini Agent endpoint
- `GET /health` - Health check

## Environment Variables

- `GEMINI_API_KEY` - Your Google Gemini API key (optional, defaults to hardcoded key)
- `GEMINI_MODEL` - Gemini model to use (default: gemini-pro)
- `PORT` - Server port (default: 3001)

## Using Gemini API

All copilots now use Google's Gemini API instead of OpenAI. The API key is configured by default, but you can override it using environment variables.

### Example Request

```bash
curl -X POST http://localhost:3001/api/copilots/code \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How do I create a React component?",
    "language": "javascript"
  }'
```

### Example Response

```json
{
  "success": true,
  "response": "To create a React component...",
  "copilot": "Code Copilot"
}
```

