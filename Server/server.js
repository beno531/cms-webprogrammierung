require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger/swagger_output.json')


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());

app.use('/api', routes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})