import jwt from 'jsonwebtoken'

import { Request, Response, NextFunction } from 'express'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // console.log("midleware 2")
    const authHeader = req.headers.authorization
    // console.log(req.headers.authorization)
    if (authHeader === null || authHeader === undefined) {
        return res.status(401).json({
            success: false,
            message: "Token Not Found"
        })
    }

    const token = authHeader.split(" ")[1]
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            })
        }

        req.user = user as AuthUser
        next();
    })
}

export default authMiddleware