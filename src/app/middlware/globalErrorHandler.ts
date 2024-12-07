import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError, ZodIssue } from 'zod'
import { TErrorSource } from '../interface/error'
import config from '../config'


const globalErrorHandler : ErrorRequestHandler = (
  err,
  req,
  res,
  next,
): void => {
  let statusCode = err.statusCode || 500
  let message = err?.message || 'An unexpected error occurred!'



 
  let errorSources:TErrorSource = [{
     path: '',
     message: 'Something went wrong'
  }]


  const handleZodError = (err: ZodError) => {

    const errorSource:TErrorSource = err.issues.map((issue:ZodIssue) => {
     return{
      path:issue?.path[issue.path.length-1],
      message:issue?.message
     }
    })

    const statusCode = 400;
    return {
        statusCode,
        message: 'Zod Validation Error',
        errorSource
    }
  }

  if(err instanceof ZodError){
    const simplifiedError = handleZodError(err)

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSource;
  }

  // console.error(err)
   res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  })
}

export default globalErrorHandler
