const express = require('express');
const actorApi = require('../controller/actorController');
const addressApi = require('../controller/addressController');

const app = express();
const port = 8000;

app.use(express.json());
app.use('/api',actorApi);
app.use('/api',addressApi);

app.listen(port,()=>{
    console.log('server is running ', port)
});


