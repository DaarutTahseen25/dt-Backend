import AppError from "../utils/AppError.js"

const errorHandler = (err, _, res, _) => {

  console.error('❌', err);

  // Prisma or other known DB errors can be customized here
  if (err.code === 'P2002') {
    return res.status(400).json({
      status: 'fail',
      message: 'Unique constraint failed',
    });
  }
  // Operational AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  // Fallback: Unhandled errors
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });

}

export default errorHandler
