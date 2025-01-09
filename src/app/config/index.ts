import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  NODE_ENV:process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_solt: process.env.BCRYPT_SOLT,
  default_password: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expiresh_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expiresh_in: process.env.JWT_REFRESH_EXPIRES_IN,
  reset_password_link: process.env.RESET_PASSWORD_UI,
}
