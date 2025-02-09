const cors = require('cors');

const coreMiddlewar = cors({

    origin: ["http://127.0.0.1:5500", "www.cardproject.co.il", "http://localhost:5173", "http://localhost:5174",
        "https://card-project-frontend.onrender.com"
    ]
})


module.exports = coreMiddlewar;