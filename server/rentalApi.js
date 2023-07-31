const express = require('express');
const actorApi = require('../controller/actorController');
const addressApi = require('../controller/addressController');

const app = express();
const port = 8000;

app.use(express.json());
app.use('/actor',actorApi);
app.use('/address',addressApi);

app.listen(port,()=>{
    console.log('server is running ', port)
});


