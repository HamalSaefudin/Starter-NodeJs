const moment = require('moment')

exports.postContent=(req,res,next)=>{
    const title = req.body.title;
    const image = req.body.image;
    const body = req.body.body;
    const name = req.body.name;

    const result = {
        message: "Create Content Success",
        data:{
            uid:1,
            title:title,
            image:image,
            body:body,
            created_at:moment(),
            author:{
                uid:1,
                name:name
            }
        }
    }
    res.status(201).json(result)
}