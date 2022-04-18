require("dotenv").config();
const jwt = require("jsonwebtoken")


const verifyToken = (token) => {

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, admin) =>{
            if(err) 
            return(err);

            resolve(admin);
        })
    })
}

const authenticate = async (req, res, next) => {
    //check if authorization header has been set

    //if not throw an errors
    if(! req.headers.authorization)
    return res.status(400).send({message: "authorization token was not provided or was not valid"})

    //if bearer token is in authorization header
    // if not throw an error

    if(! req.headers.authorization.startsWith("Bearer "))
    return res.status(400).send({message: "authorization token was not provided or was not valid"})


    //split the bearer token and get thr [1] which is token
    const token = req.headers.authorization.split(" ")[1]

    // then we will call jwt to verify the token
    let admin;
      //if token is invalid then we will throw an error
    try{
        admin = await verifyToken(token)
    }catch(err) {
        return res.status(400).send({message: "authorization token was not provided or was not valid"})
    }
    
 


  

    //if token is valid then we will put the user retrieved from the token in the req object
    req.admin = admin.admin;
    console.log("admin", req.admin);

    // return next()

    return next();
}

module.exports= authenticate;