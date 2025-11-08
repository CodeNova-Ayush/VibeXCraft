// Request validation middleware

export const validateCopilotRequest = (req, res, next) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Message is required and must be a non-empty string',
    });
  }

  if (message.length > 10000) {
    return res.status(400).json({
      success: false,
      error: 'Message is too long. Maximum length is 10000 characters',
    });
  }

  next();
};

export const validateCodeCopilotRequest = (req, res, next) => {
  validateCopilotRequest(req, res, () => {
    const { code, language } = req.body;
    
    if (code && typeof code !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Code must be a string',
      });
    }

    if (language && typeof language !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Language must be a string',
      });
    }

    next();
  });
};

export const validateMeetingCopilotRequest = (req, res, next) => {
  validateCopilotRequest(req, res, () => {
    const { transcript, participants } = req.body;
    
    if (transcript && typeof transcript !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Transcript must be a string',
      });
    }

    if (participants && !Array.isArray(participants)) {
      return res.status(400).json({
        success: false,
        error: 'Participants must be an array',
      });
    }

    next();
  });
};

export const validateTutorCopilotRequest = (req, res, next) => {
  validateCopilotRequest(req, res, () => {
    const { topic, level } = req.body;
    
    if (topic && typeof topic !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Topic must be a string',
      });
    }

    if (level && typeof level !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Level must be a string',
      });
    }

    next();
  });
};

export const validateDesignCopilotRequest = (req, res, next) => {
  validateCopilotRequest(req, res, () => {
    const { designType, currentDesign } = req.body;
    
    if (designType && typeof designType !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Design type must be a string',
      });
    }

    if (currentDesign && typeof currentDesign !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Current design must be a string',
      });
    }

    next();
  });
};

export const validateWorkflowCopilotRequest = (req, res, next) => {
  validateCopilotRequest(req, res, () => {
    const { projectType, tasks } = req.body;
    
    if (projectType && typeof projectType !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Project type must be a string',
      });
    }

    if (tasks && !Array.isArray(tasks)) {
      return res.status(400).json({
        success: false,
        error: 'Tasks must be an array',
      });
    }

    next();
  });
};

