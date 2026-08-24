import jwt from "jsonwebtoken";

export function verifyToken(request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return null;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    return decoded;
  } catch (error) {
    return null;
  }
}