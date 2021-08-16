const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(multer().array());
const port = 3000;
const routers = require('./routers');
app.use(routers);
app.listen(port, () => console.log(`Server running at https://localhost:${port}`))