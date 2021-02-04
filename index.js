const express = require('express');
const app = express();
const authRoutes = require('./src/routes/Authentication')
const blogRoutes = require('./src/routes/Blog')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path')

const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().getTime()+ ' - ' + file.originalname);
    }
})

const fileFilter=(req,file,cb)=>{
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' || 
        file.mimetype ==='image/jpeg'
    ){
        cb(null,true);
    }else{
        cb(null,false)
    }
}

app.use(bodyParser.json());
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'))
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})
app.use('/images',express.static(path.join(__dirname,'images')))
app.use('/v1/auth',authRoutes)
app.use('/v1/blog',blogRoutes)

app.use((err,req,res,next)=>{
    const status = err.errorStatus || 500;
    const message = err.message;
    const data = err.data;
    res.status(status).json({message, data})
})

mongoose
.connect('mongodb+srv://Hamal:Mern220402@cluster0.t8wvl.mongodb.net/MernBlog?retryWrites=true&w=majority')
.then(()=>{
    app.listen(4000,()=>{console.log('connection success')})
})
.catch(e=>console.log(e))