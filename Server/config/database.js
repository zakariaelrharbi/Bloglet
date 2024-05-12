// Database configuration
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.DB_URI;

const connect = async () => {
    try {
      
      await mongoose.connect(uri);
      console.log("Connected to the database Successfully");
    } 
    catch (error) {
      console.log('Error connecting to the database:',error);
    }
  };

module.exports = connect