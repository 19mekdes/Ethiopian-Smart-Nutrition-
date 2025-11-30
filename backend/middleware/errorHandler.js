

const errorHandler = (err, req, res, next) => {
  
  console.error(err.stack || err);

  
  const statusCode = res.statusCode && res.statusCode >= 400 ? res.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  
  res.status(statusCode);

  
  const response = {
    success: false,
    message,
    
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  
  if (err.name === 'ValidationError') {
    response.message = 'Validation Error';
    response.errors = Object.values(err.errors).map(e => e.message);
  }

  if (err.code === 11000) { 
    response.message = 'Duplicate field value entered';
    response.error = 'E11000';
  }

  if (err.name === 'CastError') {
    response.message = 'Resource not found with the provided ID';
    res.status(404);
  }

  res.json(response);
};


module.exports = errorHandler;