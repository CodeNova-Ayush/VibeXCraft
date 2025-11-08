// AI Copilot Controller using OpenAI GPT API
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize OpenAI client
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey || apiKey === 'your_openai_api_key_here' || apiKey.trim() === '') {
    throw new Error('OPENAI_API_KEY is not set or is invalid. Please add it to your .env file.');
  }
  
  return new OpenAI({
    apiKey: apiKey,
  });
};

// Get API key status
const getApiKeyStatus = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'your_openai_api_key_here' || apiKey.trim() === '') {
    return { valid: false, message: 'OPENAI_API_KEY is not set' };
  }
  return { valid: true, message: 'OPENAI_API_KEY is set' };
};

// Call OpenAI GPT
const callOpenAI = async (messages, model = 'gpt-3.5-turbo', maxTokens = 2000) => {
  try {
    const client = getOpenAIClient();
    
    const response = await client.chat.completions.create({
      model: model,
      messages: messages,
      max_tokens: maxTokens,
      temperature: 0.7,
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error('No response from OpenAI API');
    }

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error.response?.status === 401) {
      throw new Error('Invalid OpenAI API key. Please check your OPENAI_API_KEY in .env file.');
    }
    
    if (error.response?.status === 429) {
      throw new Error('OpenAI API rate limit exceeded. Please try again later.');
    }
    
    if (error.message?.includes('API key')) {
      throw error;
    }
    
    throw new Error(`OpenAI API error: ${error.message || 'Unknown error'}`);
  }
};

// Code Copilot
export const codeCopilot = async (req, res, next) => {
  try {
    const { message, code, language, context } = req.body;

    const systemPrompt = `You are an expert code assistant and pair programmer. Help users write, debug, refactor, and understand code. 
Provide clear, concise, and well-commented code examples. Always explain your reasoning.
${language ? `The user is working with ${language} code.` : ''}
${code ? `Here is the current code:\n\`\`\`${language || 'text'}\n${code}\n\`\`\`` : ''}`;

    const userMessage = code 
      ? `${message}\n\nCode:\n\`\`\`${language || 'text'}\n${code}\n\`\`\``
      : message;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ];

    const response = await callOpenAI(messages, process.env.OPENAI_MODEL || 'gpt-3.5-turbo');

    res.json({
      success: true,
      response: response,
      copilot: 'Code Copilot',
    });
  } catch (error) {
    next(error);
  }
};

// Meeting Copilot
export const meetingCopilot = async (req, res, next) => {
  try {
    const { message, transcript, participants } = req.body;

    const systemPrompt = `You are an intelligent meeting assistant. Help summarize meetings, extract action items, answer questions about meeting content, and provide insights.
${participants && participants.length > 0 ? `Participants: ${participants.join(', ')}` : ''}`;

    const userMessage = transcript
      ? `${message}\n\nMeeting Transcript:\n${transcript}`
      : message;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ];

    const response = await callOpenAI(messages, process.env.OPENAI_MODEL || 'gpt-3.5-turbo');

    res.json({
      success: true,
      response: response,
      copilot: 'Meeting Copilot',
    });
  } catch (error) {
    next(error);
  }
};

// Tutor Copilot
export const tutorCopilot = async (req, res, next) => {
  try {
    const { message, topic, level, context } = req.body;

    const systemPrompt = `You are a patient and knowledgeable tutor. Explain concepts clearly, provide examples, answer questions, and help students learn effectively.
${topic ? `Current topic: ${topic}` : ''}
${level ? `Student level: ${level}` : ''}
Use simple language, provide examples, and break down complex concepts into smaller parts.`;

    const userMessage = message;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ];

    const response = await callOpenAI(messages, process.env.OPENAI_MODEL || 'gpt-3.5-turbo');

    res.json({
      success: true,
      response: response,
      copilot: 'Tutor Copilot',
    });
  } catch (error) {
    next(error);
  }
};

// Design Copilot
export const designCopilot = async (req, res, next) => {
  try {
    const { message, designType, currentDesign, context } = req.body;

    const systemPrompt = `You are an expert UI/UX designer and design assistant. Help users create beautiful, functional, and user-friendly designs.
${designType ? `Design type: ${designType}` : ''}
Provide design suggestions, critique designs, suggest improvements, and help with design decisions.`;

    const userMessage = currentDesign
      ? `${message}\n\nCurrent Design:\n${currentDesign}`
      : message;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ];

    const response = await callOpenAI(messages, process.env.OPENAI_MODEL || 'gpt-3.5-turbo');

    res.json({
      success: true,
      response: response,
      copilot: 'Design Copilot',
    });
  } catch (error) {
    next(error);
  }
};

// Workflow Copilot
export const workflowCopilot = async (req, res, next) => {
  try {
    const { message, projectType, tasks, context } = req.body;

    const systemPrompt = `You are a project management and workflow optimization assistant. Help users plan projects, organize tasks, optimize workflows, and manage time effectively.
${projectType ? `Project type: ${projectType}` : ''}
Provide actionable advice, suggest task breakdowns, identify bottlenecks, and help improve productivity.`;

    const userMessage = tasks && tasks.length > 0
      ? `${message}\n\nCurrent Tasks:\n${JSON.stringify(tasks, null, 2)}`
      : message;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ];

    const response = await callOpenAI(messages, process.env.OPENAI_MODEL || 'gpt-3.5-turbo');

    res.json({
      success: true,
      response: response,
      copilot: 'Workflow Copilot',
    });
  } catch (error) {
    next(error);
  }
};

export { getApiKeyStatus };

