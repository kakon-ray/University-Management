import Jwt from 'jsonwebtoken'
import config from '../../config'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const createToken = (
  jsonPayload: { userId: string; role: string },
  secret: string,
  expireshIn: string,
) => {
  return Jwt.sign(jsonPayload, secret as string, { expiresIn: expireshIn })
}

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret as string) as JwtPayload
}
