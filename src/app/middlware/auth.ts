import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TuserRole } from "../modules/users/user.interface";
import { User } from "../modules/users/user.model";
import { Admin } from "../modules/admin/admin.model";

const auth = (...requiredRoles: TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking is if the token not provide
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const {role, userId, iat} = decoded

    const user = await User.isUserExistsByCustomId(userId);

    // checking if the user not found
    if (!user) {
      throw new AppError(
        400,
        "User does not exists                                                                                                                                                                   "
      );
    }

    
    // checking if the admin is soft deleted
    if (user?.isDeleted) {
      throw new AppError(400, "The User is Deleted");
    }


    // checking if the user is blocked
    if (user?.status == "blocked") {
      throw new AppError(400, "The user is blocked");
    }

    
    // if user chnage password after login checking
    if(user.passwordChnageAt && await User.isJwtIssuedBeforePasswordChanged(user.passwordChnageAt, iat as number)){
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized please login !");
    }


    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not outhorized from this role"
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
