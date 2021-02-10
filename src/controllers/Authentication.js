const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs')
const User = require('../models/Authentication')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'sk2woialoi932099asd2lkoalskd/(asldjaldskas)fgqwejbvcrt3fg'

exports.register= (async(req,res,next)=>{
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;

    try{
        const hashedPass = await bcrypt.hash(password,1)
        const UserData = new User({
            email,
            password:hashedPass,
            fullname
        })
        const result = await UserData.save()
        res.status(200).json({
            message:'User Created',
            data: result
        })
    }catch(e){
        const error = e.code === 11000? 'User Already Exist': e
        next(error)
    }
})

exports.login= (async(req,res,next)=>{
    try {
      const {username,password} = req.body;
      const user = await User.findOne({email:username}).lean();
      if(!user){
          const error = new Error('Invalid Username/password');
          error.status = 404;
          throw error;
      }
      if(bcrypt.compare(password,user.password)){
          const token = jwt.sign({ 
              id:user._id, 
              username:user.username 
          }, JWT_SECRET) 
          res.status(201).json({
              token
          })
      }
    } catch(e) {
        next(e)
    }
})