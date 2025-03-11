import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
import dotenv from "dotenv";

dotenv.config();

const JWT_KEY = process.env.JWT_SECRET || "default_secret";

export const generateToken = (userId) => {
  return sign({ user: { id: userId } }, JWT_KEY);
};

export const verifyToken = (token) => {
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }
  try {
    const decoded = verify(token, JWT_KEY);
    return decoded;
  } catch (error) {
    console.error("Invalid Token:", error.message);
    return null; // Return null instead of throwing error
  }
};

//function to generate a temporary token valid for only 30 minutes
export const generateTempToken = (userId) => {
  return sign({ user: { id: userId } }, JWT_KEY, { expiresIn: "30m" });
};

// export default { generateToken, verifyToken, generateTempToken };