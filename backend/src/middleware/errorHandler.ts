import type { Request, Response, NextFunction } from "express"

export interface AppError extends Error {
  status?: number
}

export const errorHandler = (error: AppError, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500
  const message = error.message || "Internal Server Error"

  console.error(`[Error] ${status}: ${message}`)

  res.status(status).json({
    error: {
      status,
      message,
    },
  })
}

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
