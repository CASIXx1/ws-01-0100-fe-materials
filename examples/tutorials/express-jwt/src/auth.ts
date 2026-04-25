import type { Request, Response } from "express";

export function saveToken(res: Response, token: string): void {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}

export function getToken(req: Request): string | null {
  const tokenFromCookie = req.cookies?.accessToken;
  if (tokenFromCookie) {
    console.log("Token found in cookie");
    return tokenFromCookie;
  }

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    console.log("Token found in Authorization header");
    return authHeader.substring(7);
  }

  return null;
}
