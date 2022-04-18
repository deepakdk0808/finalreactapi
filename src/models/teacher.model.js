const mongoose=require('mongoose')

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age:{type:Number,required:true,default:"female"},
    class_id:[{type:mongoose.Schema.Types.ObjectId,ref:"class",required:true }],
    admin_id:{type:mongoose.Schema.Types.ObjectId,ref:"admin",required:true }
    
},{
    timestamps:true,
    versionKey:false
})


const Teacher = mongoose.model('teacher', teacherSchema)

module.exports=Teacher

 