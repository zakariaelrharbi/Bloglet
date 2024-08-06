const express = require('express');
const dotenv = require("dotenv");
const connect = require('./config/database');
const cors = require('cors');
const router = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// auth routes
app.use('/api', router);
// user routes
app.use('/api/user', userRouter);


const PORT = process.env.SERVER_PORT || 8000;

async function main() {
    await connect();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

main();
