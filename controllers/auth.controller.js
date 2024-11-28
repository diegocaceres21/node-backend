import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import {createAccessToken} from "../libs/jwt.js";
import jwt from "jsonwebtoken"
import {TOKEN_SECRET_KEY} from "../config.js";
import {OAuth2Client} from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


export const register = async (req, res) => {
    const {email, password, username} = req.body

    try {
        const passwordHash = await bcrypt.hash(password,10)
        const newUser = new User({
            username,
            email,
            password:passwordHash
        })
        
        const userSaved= await newUser.save();
        const token = await createAccessToken({id: userSaved._id})
        res.cookie("token", token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
 };
export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const userFound = await User.findOne({email: email})
        if (!userFound) return res.status(400).json({message: 'User not found'})

        const isMatch = await bcrypt.compare(password,userFound.password)
        if (!isMatch) return res.status(400).json({message: 'Contraseña incorrecta'})

        const token = await createAccessToken({id: userFound._id})
        res.cookie("token", token)
        res.cookie("email", userFound.email)
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};


export const loginGoogle = async (req, res) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken : req.body.credential,
            audience : process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const userDetails = {
            email : payload['email'],
            firstname : payload['given_name'],
            lastname : payload['family_name']
        }
        let user = await User.findOne({ email: userDetails.email });
        if(!user){
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const token = await createAccessToken({id: user._id})
        //let token = jwt.sign(userDetails, process.env.SECRET_KEY);
        res.cookie("token", token)
        res.cookie("email", payload['email'])
        res.redirect("http://localhost:4200/horarios/opciones")

        //res.status(200).json({ token: token })
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
}

export const logout = (req, res) => {
    res.cookie("token","",{
        expires: new Date(0)
    })
    return res.sendStatus(200);
}
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(400).json({message:"User not found"});
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET_KEY, async (error, user) => {
        if (error) return res.sendStatus(401);

        const userFound = await User.findById(user.id);
        if (!userFound) return res.sendStatus(401);

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};
