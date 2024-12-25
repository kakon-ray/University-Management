import Jwt from "jsonwebtoken";
import config from "../../config";

export const createToken = (
  jsonPayload: { userId: string; role: string },
  secret: string,
  expireshIn: string
) => {
  return Jwt.sign(jsonPayload, secret as string, { expiresIn: expireshIn });
};
