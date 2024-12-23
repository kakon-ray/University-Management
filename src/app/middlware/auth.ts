import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { TuserRole } from '../modules/users/user.interface'

const auth = (...requiredRoles: TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
    }

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'You are not outhorized')
        }

        console.log(decoded)
        const role = (decoded as JwtPayload).role
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You are not outhorized from this role',
          )
        }
        // decoded
        req.user = decoded as JwtPayload
        next()
      },
    )
  })
}

export default auth
