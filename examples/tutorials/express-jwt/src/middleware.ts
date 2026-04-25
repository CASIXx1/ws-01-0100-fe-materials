import type { Response, NextFunction } from "express";
import type { Request } from "./types";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { getToken } from "./auth";

export function authenticate(excludePaths: string[] = []) {
  return function (req: Request, res: Response, next: NextFunction): void {
    if (excludePaths.includes(req.path)) {
      next();
      return;
    }
    console.log(`Authenticating request for ${req.path}`);
    try {
      const token = getToken(req);
      console.log(`Token found: ${token ? "Yes" : "No"}`);
      if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      // FIXME: 本番運用では、必ず環境変数など外部から秘密鍵を読み込むようにしてください。
      const secret = "your_secret_key";

      const decoded = jwt.verify(token, secret) as JwtPayload;

      req.user = {
        id: decoded.id,
        name: decoded.name,
      };
      console.log(`Authenticated user: ${req.user.name} (ID: ${req.user.id})`);

      next();
    } catch {
      res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}
