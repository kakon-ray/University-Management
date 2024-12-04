import { NextFunction, Request, Response } from 'express'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500
  const message = err?.message || 'An unexpected error occurred!'

  if (err.stack) {
    console.error(err.stack)
  }
  // console.error(err)
  res.status(statusCode).json({
    success: false,
    message,
    errorDetails:
      process.env.NODE_ENV === 'development' ? err.stack : undefined,
  })
}

export default globalErrorHandler
