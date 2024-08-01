import { Router } from "express";
import {login, register, logout, profile, verifyToken, loginGoogle} from "../controllers/auth.controller.js"
import {authRequired} from "../middlewares/validateToken.js";
import {validateSchema} from "../middlewares/validate.middleware.js";
import {registerSchema, loginSchema} from "../schemas/auth.schema.js";
import pkg from 'body-parser';

const router = Router()
const { urlencoded } = pkg;
const urlencodedParser = urlencoded({ extended: true });


router.post('/register', validateSchema(registerSchema), register)
router.post('/login',validateSchema(loginSchema), login)
router.post('/loginGoogle',urlencodedParser, loginGoogle)

router.post('/logout', logout)

router.get('/verify', verifyToken)
router.get('/profile',authRequired, profile)
    
export default router