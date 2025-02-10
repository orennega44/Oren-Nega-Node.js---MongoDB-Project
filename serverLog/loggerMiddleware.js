// const fs = require('fs');
// const path = require('path');

// const logsDir = path.join(__dirname, '../logs'); // Ensure logs folder is in the root

// // Ensure logs directory exists
// if (!fs.existsSync(logsDir)) {
//     fs.mkdirSync(logsDir, { recursive: true });
// }

// const loggerMiddleware = (err, req, res, next) => {
//     const statusCode = err.status || res.statusCode || 500; // Ensure we get the actual error status

//     if (statusCode >= 400) {
//         const now = new Date();
//         const logFileName = `${now.toISOString().split('T')[0]}.log`; // e.g., 2025-02-09.log
//         const logFilePath = path.join(logsDir, logFileName);

//         const logMessage = `[${now.toISOString()}] ${req.method} ${req.url} - Status: ${statusCode} - Error: ${err.message || 'Unknown error'}\n`;

//         fs.appendFile(logFilePath, logMessage, (error) => {
//             if (error) console.error("Failed to write log:", error);
//         });
//     }

//     // If there’s another error-handling middleware, pass the error along
//     if (next) next(err);
// };

// module.exports = loggerMiddleware;



const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../logs'); // Ensure logs are stored at the project root

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const loggerMiddleware = (err, req, res, next) => {
    const statusCode = err.status || res.statusCode || 500; // Ensure we log the correct status

    console.log("🚀 Logger Middleware Triggered:", req.method, req.url, "Status:", statusCode);

    if (statusCode >= 400) {
        const now = new Date();
        const logFileName = `${now.toISOString().split('T')[0]}.txt`; // e.g., 2025-02-09.log
        const logFilePath = path.join(logsDir, logFileName);

        const logMessage = `[${now.toISOString()}] ${req.method} ${req.url} - Status: ${statusCode} - Error: ${err.message || 'Unknown error'}\n`;

        console.log("📝 Writing Log:", logMessage); // Debugging line

        fs.appendFile(logFilePath, logMessage, (error) => {
            if (error) console.error("❌ Failed to write log:", error);
        });
    }

    next(err);
};

module.exports = loggerMiddleware;
