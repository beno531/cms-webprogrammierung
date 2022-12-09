require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const apiRoutes = require('./routes/apiRoutes');
const privateRoutes = require('./routes/privateRoutes');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const path = require('path');


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

app.use('/css', express.static(path.resolve(__dirname, "client/css")));
app.use('/js', express.static(path.resolve(__dirname, "client/js")));
app.use("/media", express.static("media"));

app.use(bodyParser.json());

app.use(express.json());

// Swagger Doc
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/', express.static(path.resolve(__dirname, "client/html/public")));
app.use('/cms', privateRoutes);
app.use('/api', apiRoutes);


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})