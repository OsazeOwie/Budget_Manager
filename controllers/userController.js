const asyncHandler = require("express-async-handler");
const UserSchema = require("../modules/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if ( !username || !email || !password ) {
        res.status(400);
        throw new Error("Please fill out all fields");
    }

    const userExist = await UserSchema.findOne({ email })
    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await UserSchema.create({
        username,
        email,
        password: hashedPassword
    })

    if (newUser) {
        res.status(201).json(
            {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            })
    }else{
        res.status(400);
        throw new Error("User input is not valid");
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if( !email || !password) {
        res.status(400);
        throw new Error("Please fill out all fields")
    }

    const user = await UserSchema.findOne({ email })
    if( user && (await bcrypt.compare(password, user.password)) ) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60m" }
        )
        res.status(200).json({accessToken})
    }else{
        res.status(400);
        throw new Error("Password and email don't match");
    }
})

const currentUser = asyncHandler(async( req, res ) => {
    res.status(202).json(req.user)
})



module.exports = {
    registerUser,
    loginUser,
    currentUser
}