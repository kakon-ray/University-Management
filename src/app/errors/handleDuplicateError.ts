import mongoose from 'mongoose'
import { TErrorSources, TGenericErrorResponse } from '../interface/error'

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/name: "(.*?)"/)
  const extractedName = match ? match[1] : null

  const errorSource: TErrorSources = [
    {
      path: '',
      message: `${extractedName} is already exists`,
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Invalid ID Cast Error',
    errorSource,
  }
}
