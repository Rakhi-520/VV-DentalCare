

export function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
}

// Default export (helps if someone does `import pkg from './middleware/error.js'`)
const _default = { errorHandler };
export default _default;

// CommonJS compatibility (helps if Node treats this file as CJS for any reason)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { errorHandler };
}
