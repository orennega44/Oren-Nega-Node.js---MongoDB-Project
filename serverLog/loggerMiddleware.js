const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../logs'); // Ensure logs are stored in the root

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const loggerMiddleware = (err, req, res, next) => {
   
    const statusCode = err.status || res.statusCode || 500;
    res.status(statusCode); // Ensure status code is properly set

    if (statusCode >= 400) {
        const now = new Date();
        const logFileName = `${now.toISOString().split('T')[0]}.log`; // Logs per day
        const logFilePath = path.join(logsDir, logFileName);

        const logMessage = `[${now.toISOString()}] ${req.method} ${req.url} - Status: ${statusCode} - Error: ${err.message || 'Unknown error'}\n`;

        fs.appendFile(logFilePath, logMessage, (error) => {
            if (error) {
                console.error("Failed to write log:", error);
            }
        });
    }

    next(err); 
};

module.exports = loggerMiddleware;
