// Copilot Routes

import express from 'express';
import { 
  codeCopilot, 
  meetingCopilot, 
  tutorCopilot, 
  designCopilot, 
  workflowCopilot 
} from '../controllers/copilotController.js';
import { 
  validateCodeCopilotRequest,
  validateMeetingCopilotRequest,
  validateTutorCopilotRequest,
  validateDesignCopilotRequest,
  validateWorkflowCopilotRequest
} from '../middleware/validator.js';
import { copilotLogger } from '../middleware/logger.js';

const router = express.Router();

// Code Copilot Route
router.post(
  '/code',
  copilotLogger('Code Copilot'),
  validateCodeCopilotRequest,
  codeCopilot
);

// Meeting Copilot Route
router.post(
  '/meeting',
  copilotLogger('Meeting Copilot'),
  validateMeetingCopilotRequest,
  meetingCopilot
);

// Tutor Copilot Route
router.post(
  '/tutor',
  copilotLogger('Tutor Copilot'),
  validateTutorCopilotRequest,
  tutorCopilot
);

// Design Copilot Route
router.post(
  '/design',
  copilotLogger('Design Copilot'),
  validateDesignCopilotRequest,
  designCopilot
);

// Workflow Copilot Route
router.post(
  '/workflow',
  copilotLogger('Workflow Copilot'),
  validateWorkflowCopilotRequest,
  workflowCopilot
);

export default router;

