// Request logging middleware

export const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};

// Log copilot requests with details
export const copilotLogger = (copilotType) => (req, res, next) => {
  console.log(`\n🤖 ${copilotType} Copilot Request:`);
  console.log(`   Message: ${req.body.message?.substring(0, 100)}${req.body.message?.length > 100 ? '...' : ''}`);
  if (req.body.code) console.log(`   Code: ${req.body.code.substring(0, 50)}...`);
  if (req.body.transcript) console.log(`   Transcript: ${req.body.transcript.substring(0, 50)}...`);
  
  next();
};

