const {validationResult} = require('express-validator')
const { v4: uuidv4 } = require('uuid');
const ContentBlog = require('../models/Blog')
const path = require('path')
const fs = require('fs');

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
        },
        isDeleted:1
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

exports.getAllContentBlog=(req,res,next)=>{
    ContentBlog.find({isDeleted:1})
    .then((x)=>{
        res.status(200).json({
            message:'Data Berhasil Dipanggil',
            data:x
        })
    })
    .catch(err=>{
        next(err)
    })
}

exports.getContentById=(req,res,next)=>{
    const postId = req.params.postId;
    ContentBlog.findById(postId)
    .then(x=>{
        if(!x){
            const error = new Error('Content Tidak ditemukan');
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            message:'Data Ditemukan',
            data:x
        })
    })
    .catch(err=>next(err))
}

exports.updateContent=(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const err = new Error('Invalid Value');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;
    const name = req.body.name;

    const postId = req.params.postId;
    ContentBlog.findById(postId)
    .then(x=>{
        if(!x){
            const error = new Error('Content Tidak Ditemukan');
            error.status = 404;
            throw error;
        }
        x.title = title;
        x.body = body;
        x.image = image || x.image;
        x.name = name;

        return x.save()
    })
    .then(result => {
        res.status(200).json({
            message:'Update Successfull',
            data: result
        })
    })
    .catch(err=>next(err));
}

const removeImage=({filePath})=>{
    filePath = path.join(__dirname, '../..',filePath);
    fs.unlink(filePath, err=>{console.log(err)} )
}

exports.deleteContent=(req,res,next)=>{
    const postId = req.params.postId

    ContentBlog.findById(postId)
    .then(x=>{
        if(!x){
            const error = new Error('Content Not Found');
            error.status = 404;
            throw error;
        }
        removeImage({filePath:x.image});
        return ContentBlog.findByIdAndRemove(postId);
    })
    .then(result=>{
        res.status(200).json({
            message:'Content successfully deleted',
            data:result
        })
    })
    .catch(e=>next(e))
}

exports.softDeleteContent=(req,res,next)=>{
    const postId = req.params.postId;

    ContentBlog.findById(postId)
    .then(x=>{
        if(!x){
            const error = new Error('Content Not Found');
            error.status = 404;
            throw error;
        }
        x.isDeleted = 2;
        return x.save();
    })
    .then(result => {
        res.status(200).json({
            message:'Soft Delete Successfull',
            data: result
        })
    })
    .catch(err=>next(err))
}