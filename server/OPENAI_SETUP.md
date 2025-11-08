# OpenAI GPT API Setup Guide

## Overview
The VibeXCraft AI Copilot API now uses OpenAI GPT models (GPT-3.5-turbo, GPT-4) for all copilot functionalities.

## Setup Instructions

### 1. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy your API key (you won't be able to see it again)

### 2. Add API Key to .env File
1. Open `server/.env` file
2. Replace `your_openai_api_key_here` with your actual API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```
3. (Optional) Change the model if needed:
   ```
   OPENAI_MODEL=gpt-3.5-turbo
   ```
   Available models:
   - `gpt-3.5-turbo` (default, fastest, cheapest)
   - `gpt-4` (more capable, slower, more expensive)
   - `gpt-4-turbo-preview` (latest GPT-4, most capable)

### 3. Restart the Server
```bash
cd server
npm start
```

## Available Copilots

All copilots now use OpenAI GPT API:

1. **Code Copilot** - `POST /api/copilots/code`
   - Code generation, debugging, refactoring
   - Supports multiple programming languages
   - Context-aware code assistance

2. **Meeting Copilot** - `POST /api/copilots/meeting`
   - Meeting summaries
   - Action item extraction
   - Q&A about meeting content

3. **Tutor Copilot** - `POST /api/copilots/tutor`
   - Educational explanations
   - Concept clarification
   - Learning assistance

4. **Design Copilot** - `POST /api/copilots/design`
   - UI/UX design suggestions
   - Design critiques
   - Design improvements

5. **Workflow Copilot** - `POST /api/copilots/workflow`
   - Project planning
   - Task organization
   - Workflow optimization

## API Usage

### Example Request
```javascript
const response = await fetch('http://localhost:3001/api/copilots/code', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'How do I create a React component?',
    language: 'javascript',
    code: '// existing code here'
  }),
});

const data = await response.json();
console.log(data.response);
```

## Error Handling

The API handles common errors:
- **401 Unauthorized**: Invalid or missing API key
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: API or model errors

## Cost Considerations

- **GPT-3.5-turbo**: ~$0.002 per 1K tokens (input), ~$0.002 per 1K tokens (output)
- **GPT-4**: ~$0.03 per 1K tokens (input), ~$0.06 per 1K tokens (output)

Monitor your usage at: https://platform.openai.com/usage

## Troubleshooting

### API Key Not Working
1. Check that `OPENAI_API_KEY` is set in `server/.env`
2. Verify the API key is correct (starts with `sk-`)
3. Check your OpenAI account has credits
4. Restart the server after changing `.env`

### Rate Limit Errors
- You've exceeded your API rate limit
- Wait a few minutes and try again
- Consider upgrading your OpenAI plan

### Model Not Found
- Check that `OPENAI_MODEL` is set to a valid model name
- Available models: `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo-preview`

## Support

For issues or questions:
- Check OpenAI API status: https://status.openai.com
- OpenAI API documentation: https://platform.openai.com/docs
- OpenAI community: https://community.openai.com

