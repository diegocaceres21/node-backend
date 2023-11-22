import jwt from "jsonwebtoken";
import {TOKEN_SECRET_KEY} from "../config.js"
export function createAccessToken(payload) {
    return new Promise ((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET_KEY,
            {
                expiresIn: "365d",
            },
            (err, token) => {
                if  (err) reject(err)
                resolve(token);
            }
        )
    })

}
