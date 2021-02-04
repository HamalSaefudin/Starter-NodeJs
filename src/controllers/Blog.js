const moment = require('moment')
const {validationResult} = require('express-validator')
const { v4: uuidv4 } = require('uuid');
const ContentBlog = require('../models/Blog')

exports.postContent=(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const err = new Error('Invalid Value');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('Image Harus Di Upload');
        err.errorStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;
    const name = req.body.name;

    const Posting = new ContentBlog({
        title,
        image,
        body,
        author:{
            uid:uuidv4(),
            name
        }
    })

    Posting.save()
    .then((x)=>{
      const result = {
          message: "Create Content Success",
          data:x
      }
      res.status(201).json(result)
    })
    .catch(e=>console.log(e))
}