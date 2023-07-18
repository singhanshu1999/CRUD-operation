const express = require('express');
const api = require('./api');

const app = express();
const port = 8000;

app.use(express.json());
app.use('/api',api);

app.listen(port,()=>{
    console.log('server is running ', port)
});


