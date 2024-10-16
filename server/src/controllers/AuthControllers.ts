import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../config/db.config.js';

interface ILoginPayload {
  name: string;
  email: string;
  provider: string;
  oauth_id: string;
  image?: string;
}

class AuthControllers {
  static async login(req: Request, res: Response) {
    // console.log("hii",req.body)
    try {
      const body: ILoginPayload = req.body
      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email
        }
      })

      if (findUser) {

        let jwtPayLoad = {
          name: findUser.name,
          email: findUser.email,
          id: findUser.id,
        }

        const token = jwt.sign(jwtPayLoad, process.env.JWT_SECRET, { expiresIn: '1h' })
        return res.json({
          success: true,
          message: "Logged in successfully!",
          user: {
            ...findUser,
            token: `Bearer ${token}`
          }
        })

        // return res.json({
        //     success:false,
        //     message:"Email already exist!",
        //   }) 
      }

      findUser = await prisma.user.create({
        data: body
      })

      let jwtPayLoad = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      }

      const token = jwt.sign(jwtPayLoad, process.env.JWT_SECRET, { expiresIn: '1h' })
      return res.json({
        success: true,
        message: "Logged in successfully!",
        user: {
          ...findUser,
          token: `Bearer ${token}`
        }
      })

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        // message:"Error in logging user"+error.message
        success: false,
        message: "Something went wrong, Please try after some time! " + error.message
      })
    }
  }
}

export default AuthControllers;