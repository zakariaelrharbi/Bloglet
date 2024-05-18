const express = require('express');
const connect = require('./config/database');
const dotenv = require("dotenv");
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
dotenv.config();
const cors = require('cors');

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

// Apply CORS middleware before defining routes
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true,
}));

app.use(express.json());

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ 
        success: false,
        statusCode,
        message
    });
});

async function main() {
    await connect();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

main();
