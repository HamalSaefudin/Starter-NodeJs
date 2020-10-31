const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const authRoutes = require('./src/routes/Authentication')
const blogRoutes = require('./src/routes/Blog')

app.use(bodyParser.json())

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
    next()
})
app.use('/v1/auth/', authRoutes)
app.use('/v1/blog/', blogRoutes)


app.listen(4000);