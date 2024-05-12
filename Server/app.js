const express = require('express');
const connect = require('./config/database');
const dotenv = require("dotenv");
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 5000;
app.use(express.json());

app.use(express.json());
app.use(express.json());


app.use('/user', userRoutes);
app.use('/auth', authRoutes);

async function main() {
    await connect();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}


main();