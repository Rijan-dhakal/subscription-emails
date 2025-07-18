import jwt from "jsonwebtoken"

export const generateJWT = (newUser) => {
  const token = jwt.sign(
    { userId: newUser._id, email: newUser.email, admin: newUser.admin },
    process.env.JWT_SECRET,
    { expiresIn: "14d" }
  );
  return token;
};
