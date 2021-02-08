const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentBlog = new Schema({
    title:{ type : String, required : true },
    body:{ type : String, required : true },
    author:{ type: Object, required : true },
    image:{ type: String, required : true },
    isDeleted:{type: Number, required: true}
},{
    timestamps:true
});

module.exports= mongoose.model('ContentBlog',ContentBlog)