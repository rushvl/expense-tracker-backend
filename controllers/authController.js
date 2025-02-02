const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(500).json({error:'Email, password, name is required'});
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({name, email, password: hashedPassword});
        res.status(201).json({ success: true, message: 'User registered successfully', newUser: newUser });
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(500).json({error:'Invalid email or password'});
    }
    try {
        console.log('Login route hit');

        const user = await User.findOne({where: {email}});
        // console.log("user: ",user);

        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({error: 'Invalid password'});
        }

        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({success: true, token, user});

    } catch(error){
        res.status(500).json({success:false, message:'login failed', error: error.message});
    }
}