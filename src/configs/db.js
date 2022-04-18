const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect(
        //"this is database for backend"
        "mongodb+srv://deepak:deep_123@cluster0.fyotr.mongodb.net/finalCountDown?retryWrites=true&w=majority"
    )
}

module.exports=connect 