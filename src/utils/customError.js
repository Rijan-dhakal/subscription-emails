export const customError = (errorMsg, statusCode) => {
  const error = new Error(errorMsg);
  error.success = false;
  error.statusCode = statusCode;
  throw error;
};
