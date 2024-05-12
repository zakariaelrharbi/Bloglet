const express = require('express');
const connect = require('./config/database');
const dotenv = require("dotenv");
const userRoutes = require('./routes/user.route');

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 5000;


async function main() {
    await connect();
    app.use('/api/user', userRoutes);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
main();