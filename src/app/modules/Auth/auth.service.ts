import config from "../../config";
import AppError from "../../errors/AppError";
import { Admin } from "../admin/admin.model";
import { TStudent } from "../students/student.interface";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createToken } from "./auth.utils";

const loginUserIntoDB = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(
      400,
      "User does not exists                                                                                                                                                                   "
    );
  }

  if (user?.status == "blocked") {
    throw new AppError(400, "The user is blocked");
  }

  const isAdminDeleted = await Admin.findOne({
    id: payload?.id,
  });

  if (isAdminDeleted?.isDeleted) {
    throw new AppError(400, "The User is Deleted");
  }

  // checking is password is matched
  const isPasswordMatchd = await User.isPasswordMatched(
    payload?.password,
    user?.password
  );



  if (!isPasswordMatchd) {
    throw new AppError(404, "Password does not match");
  }

  const jsonPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = createToken(jsonPayload, config.jwt_access_secret as string, config.jwt_access_expiresh_in as string);
  
  const refreshToken = createToken(jsonPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expiresh_in as string);

  return {
    accessToken,
    refreshToken,
    needPasswordCheange: user?.needsPasswordChange,
  };
};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; password: string }
) => {
  const user = await User.isUserExistsByCustomId(userData?.userId);

  if (!user) {
    throw new AppError(
      400,
      "User does not exists                                                                                                                                                                   "
    );
  }

  if (user?.status == "blocked") {
    throw new AppError(400, "The user is blocked");
  }

  const isAdminDeleted = await Admin.findOne({
    id: userData?.id,
  });

  if (isAdminDeleted?.isDeleted) {
    throw new AppError(400, "The User is Deleted");
  }

  const isPasswordMatchd = await User.isPasswordMatched(
    payload?.oldPassword,
    user?.password
  );

  if (!isPasswordMatchd) {
    throw new AppError(404, "Password does not match");
  }

  // hash new password

  const newHashPassword = await bcrypt.hash(
    payload?.password,
    Number(config.bcrypt_solt)
  );

  const result = await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChnageAt: new Date(),
    }
  );

  return newHashPassword;
};


const reqTokenIntoDB = async(token:string) => {


        const decoded = jwt.verify(
          token,
          config.jwt_refresh_secret as string
        ) as JwtPayload;
    
        const {userId, iat} = decoded

    
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


        const jsonPayload = {
          userId: user?.id,
          role: user?.role,
        };
      
        const accessToken = createToken(jsonPayload, config.jwt_access_secret as string, config.jwt_access_expiresh_in as string);
        
        return accessToken;
}

export const AuthServices = {
  loginUserIntoDB,
  changePasswordIntoDB,
  reqTokenIntoDB
};
