const { v4: uuidv4 } = require('uuid');

exports.register= ((req,res,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    const result = {
        message: 'Register Success',
        data:{
            uid:uuidv4(),
            name,
            email,
            password
        }
    }
    
    res.status(201).json(result)
})