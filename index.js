const express = require('express');
const app = express();

app.use(()=>{
    console.log('asd')
})

app.listen(4000);