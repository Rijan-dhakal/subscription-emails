import { customError } from "../utils/customError.js";

export const cronAuth = (req, res, next) => {
  try {
    const secret = req.headers['x-cron-secret'];

    if (!secret) customError("Missing cron secret", 401);

    if (secret !== process.env.CRON_SECRET_TOKEN) customError("Invalid cron secret", 403);

    next(); 

  } catch (error) {
    return res.status(error.statusCode || 403).json({
      success: false,
      message: error.message || "Unauthorized cron access",
    });
  }
};
