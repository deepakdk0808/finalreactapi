const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")


const adminSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    


}, {
    timestamps: true,
    versionKey: false
});

adminSchema.pre("save", function (next){
    if(! this.isModified("password"))return next();

    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next()
});

adminSchema.methods.checkPassword = function(password) {        //checkPassword is function
    return bcrypt.compareSync(password, this.password); // true
};
// const Admin = mongoose.model('admin', adminSchema)

module.exports = mongoose.model("admin", adminSchema)