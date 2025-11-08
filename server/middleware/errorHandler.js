// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  const errorMessage = err.message || String(err);

  // OpenAI API key errors (401 Unauthorized)
  if (errorMessage.includes('API_KEY') || 
      errorMessage.includes('API key') || 
      errorMessage.includes('OPENAI_API_KEY') ||
      errorMessage.includes('not set') ||
      errorMessage.includes('placeholder') ||
      errorMessage.includes('invalid') ||
      errorMessage.includes('401') ||
      errorMessage.includes('403')) {
    return res.status(401).json({
      success: false,
      error: errorMessage.includes('OPENAI_API_KEY') 
        ? errorMessage 
        : 'Invalid or missing OpenAI API key. Please add OPENAI_API_KEY to server/.env file. Get a key from https://platform.openai.com/api-keys',
    });
  }

  // API quota/rate limit errors (429 Too Many Requests)
  if (errorMessage.includes('quota') || errorMessage.includes('rate limit') || errorMessage.includes('429')) {
    return res.status(429).json({
      success: false,
      error: 'API rate limit exceeded. Please check your OpenAI API usage limits or wait a few minutes.',
    });
  }

  // OpenAI API errors
  if (errorMessage.includes('OpenAI API error')) {
    return res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }

  // Model not found errors (500 Internal Server Error)
  if (errorMessage.includes('not found') || errorMessage.includes('404') || errorMessage.includes('not supported')) {
    return res.status(500).json({
      success: false,
      error: errorMessage.includes('OPENAI_API_KEY') 
        ? errorMessage 
        : `Model error: ${errorMessage}. Please verify your OPENAI_API_KEY in server/.env file. Get a key from https://platform.openai.com/api-keys`,
    });
  }

  // Generic error
  res.status(err.status || 500).json({
    success: false,
    error: errorMessage || 'Internal server error',
  });
};

// 404 handler
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.path} not found`,
  });
};

