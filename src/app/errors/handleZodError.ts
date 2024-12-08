import { ZodError, ZodIssue } from 'zod'
import { TErrorSources, TGenericErrorResponse } from '../interface/error'

export const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSource: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })

  const statusCode = 400
  return {
    statusCode,
    message: 'Zod Validation Error',
    errorSource,
  }
}
