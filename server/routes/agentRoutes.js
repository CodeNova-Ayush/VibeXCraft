// Agent Routes

import express from 'express';
import { geminiAgent } from '../controllers/copilotController.js';
import { validateCopilotRequest } from '../middleware/validator.js';
import { copilotLogger } from '../middleware/logger.js';

const router = express.Router();

// Gemini Agent Route
router.post(
  '/gemini',
  copilotLogger('Gemini Agent'),
  validateCopilotRequest,
  geminiAgent
);

export default router;

