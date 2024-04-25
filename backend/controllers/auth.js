const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create user!" });
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        const age = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET,
            {
                expiresIn: age
            }
        );
        const { password: userPassword, ...userData } = user._doc;
        res.cookie("token", token, {
                httpOnly: true,
                maxAge: age,
                // secure: true,
            })
            .status(200)
            .json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to login!" });
    }
};


const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Sucessful!" });
}


module.exports = { register, login, logout };