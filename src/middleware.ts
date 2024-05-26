import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { AResponse } from "@/contants";
import { NextURL } from "next/dist/server/web/next-url";
import { isAuthenticated } from "./shared/config/JWTControl";

export default function myMiddleware(request: NextRequest) {
  const isStaticAsset = request.url.includes(".");
  const isLoginRoute = request.url.includes("/auth/login");
  const isLoginApiRoute = request.url.includes("/api/login");
  const isRegisterRoute = request.url.includes("/auth/register");

  const url = request.nextUrl.clone();
  url.pathname = "/auth/login";

  if (isStaticAsset || isLoginRoute || isRegisterRoute || isLoginApiRoute) {
    return NextResponse.next();
  }

  const cookie = request.headers.get("cookie");
  if (cookie) {
    const jsonPart = cookie
    .split("; ")
    .find((part) => part.startsWith("user="));
    if (jsonPart) {
      const decodedJson = decodeURIComponent(jsonPart.split("=")[1]);
      try {
        const parsedJson = JSON.parse(decodedJson);
        const token = parsedJson.data.token;
        const isTokenValid = isAuthenticated(token);
        if (!isTokenValid) {
          return goToLogin(url);
        }
        return NextResponse.next();
      } catch (error) {
        console.log("Error parsing cookie:", error);
        return goToLogin(url);
      }
    } else {
      return goToLogin(url);
    }
  }

  return goToLogin(url);
}

function goToLogin(url: NextURL) {
  return NextResponse.redirect(url);
}

function isAccessTokenValid(accessToken: string | null) {
  if (!accessToken) return false;
  jwt.verify(accessToken, "a", (err, user) => {
    console.log("err : ", err);
    if (err) return false;
    return true;
  });
}
