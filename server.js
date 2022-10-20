const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');
const cors = require('cors');
const SwaggerUI = require('swagger-ui-express');
// Load ENV variables
dotenv.config({ path: `./config/config.env`});
// Connect to the database
connectDB();

// Import Routes here
const driver = require('./routes/driver');

const app = express();
// Body Parser - Grabs data from the frontend
app.use(express.json());
// Add Cors
app.use(cors());

// dev logging middleware
if(process.env.NODE_ENV==='development'){
    app.use(logger);
}

// Routes to Mount
app.use('/api/zazu/v1/driver', driver);

// Handling Errors
app.use(errorHandler);

// PORT
const PORT = process.env.PORT || 5000;

// Listening to Port 
const server = app.listen(PORT, ()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode port ${PORT}`);
});

// Handle Unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(()=>{
        process.exit(1);
    });
});