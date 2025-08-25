/**
 * Standardized success response helper
 */
export const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {
  const response = {
    success: true,
    message,
  }

  if (data !== null) {
    response.data = data
  }

  return res.status(statusCode).json(response)
}

/**
 * Standardized error response helper
 */
export const errorResponse = (res, message = 'Error', statusCode = 500, details = null) => {
  const response = {
    success: false,
    error: {
      message,
    },
  }

  if (details) {
    response.error.details = details
  }

  return res.status(statusCode).json(response)
}

/**
 * Paginated response helper
 */
export const paginatedResponse = (res, data, pagination, message = 'Success') => {
  return res.json({
    success: true,
    message,
    data,
    pagination,
  })
}