import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('🔴 Error:', err.message || err);

  const status = err.statusCode || 500;
  const mensaje = err.message || 'Error interno del servidor';

  res.status(status).json({ error: mensaje });
};

export default errorHandler;
