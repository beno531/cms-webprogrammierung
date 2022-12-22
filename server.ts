require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const apiRoutes = require('./routes/apiRoutes');
const privateRoutes = require('./routes/privateRoutes');
const publicRoutes = require('./routes/publicRoutes');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const path = require('path');
const favicon = require('serve-favicon');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger/swagger_output.json')

const PORT = process.env.PORT || 8080;


mongoose.connect(mongoString, function (err) {
    if (err) {
        console.log(err);
    }

    console.log('Database Connected');
});

const app = express();

app.use(morgan('tiny'));

app.use(cors());

app.use(fileUpload());

app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/webfonts', express.static(path.resolve(__dirname, "assets/webfonts")));

app.use("/media", express.static(path.resolve(__dirname, "media")));

app.use(bodyParser.json());

app.use(express.json());

app.set('view engine', 'ejs');

// Swagger Doc
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(favicon(__dirname + '/assets/img/favicon.ico'));

app.use('/', publicRoutes);
app.use('/cms', privateRoutes);
app.use('/api', apiRoutes);


app.listen(3000, () => {
    console.log(`App listening at port ${PORT}`)
})