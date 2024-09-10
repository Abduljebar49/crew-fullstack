import * as jose from "jose";
import Router from "next/router"; // Next.js router
import { JWTPayload } from "jose";

const jwtConfig = {
  secret: new TextEncoder().encode('ab'),
};

export const isAuthenticated = async (token: any) => {
  if (token) {
    try {
      if (token.startsWith("Bearer")) {
        token = token.replace("Bearer ", "");
      }
      const decoded = await jose.jwtVerify(token, jwtConfig.secret);
      if (decoded.payload?._id) {
        return true;
      } else {
        return false;
      }
    } catch (err: any) {
      return false;
    }
  } else {
    return false;
  }
};
