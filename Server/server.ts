require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger/swagger_output.json')


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error: any) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(morgan('tiny'));

app.use(cors());

app.use(fileUpload());

app.use("/media", express.static("media"));

app.use(bodyParser.json());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());

app.use('/api', routes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})