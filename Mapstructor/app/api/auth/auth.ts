import jwt from "jsonwebtoken";
import { error } from "console";
import { blacklistedTokens } from "./blacklist/blacklist";

const JWT_SECRET = process.env.JWT_SECRET;

export function Auth(request:Request) {

  const authHeader = request.headers.get('authorization');
    
  if (!authHeader) {
    throw error("bad");
  }

  const token = authHeader.trim();
  if (!token) {
    throw error("bad");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload; //decode token

    const tokenId = decoded.userId as string; //get ID

    // DEBUG
    // logGlobalSet();

    if (blacklistedTokens.has(tokenId)) {
      throw new Error("Token is blacklisted"); 
    }

    return true;

  } catch (err) {
    return false;
  }
}