import express, { type Response } from "express";
import type { Request } from "./types";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { authenticate } from "./middleware";
import { saveToken } from "./auth.js";

const SALT_ROUNDS = 12;

/**
 * パスワードをハッシュ化する
 */
async function hashPassword(password: string): Promise<string> {
  if (!password || password.trim() === "") {
    throw new Error("Password is required");
  }

  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * 平文パスワードとハッシュを比較する
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  if (!password || !hashedPassword) {
    return false;
  }

  return await bcrypt.compare(password, hashedPassword);
}

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(authenticate(["/api/v1/auth/sign_up", "/api/v1/auth/sign_in"]));

type User = {
  id: number;
  name: string;
  age: number;
  paswordDidgest: string;
};

const users: User[] = [];

app.get("/api/v1/users/me", (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  const user = users.find((u) => u.id === req.user!.id);
  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }
  const userResponse = {
    id: user!.id,
    name: user!.name,
    age: user!.age,
  };
  res.json({
    data: userResponse,
  });
});

app.patch("/api/v1/users/me", (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  const user = users.find((u) => u.id === req.user!.id);
  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  const { age } = req.body;
  if (age !== undefined) {
    if (typeof age !== "number" || age <= 0) {
      return res.status(400).json({
        error: "年齢は0より大きい数値である必要があります",
      });
    }
  }
  user.age = age;
  const userResponse = {
    id: user!.id,
    name: user!.name,
    age: user!.age,
  };

  res.json({
    data: userResponse,
  });
});

app.post("/api/v1/auth/sign_up", async (req, res) => {
  const {
    name,
    age,
    password,
    password_confirmation: passwordConfirmation,
  } = req.body;
  if (password !== passwordConfirmation) {
    return res.status(400).json({
      error: "パスワードとパスワード確認が一致しません",
    });
  }
  if (age <= 0) {
    return res.status(400).json({
      error: "年齢は0より大きい必要があります",
    });
  }
  if (name.length < 3) {
    return res.status(400).json({
      error: "名前は3文字以上である必要があります",
    });
  }

  if (users.some((user) => user.name === name)) {
    return res.status(400).json({
      error: "その名前は既に使用されています",
    });
  }

  const hashedPassword = await hashPassword(password);

  const newUser: User = {
    id: users.length + 1,
    name,
    age,
    paswordDidgest: hashedPassword,
  };
  users.push(newUser);

  const data = {
    id: newUser.id,
    name: newUser.name,
    age: newUser.age,
  };

  return res.status(201).json({
    data: data,
  });
});

function generateAccessToken(id: number, username: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(
      {
        id,
        name: username,
      },
      "your_secret_key",
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        return resolve(token!);
      },
    );
  });
}

app.post("/api/v1/auth/sign_in", async (req, res) => {
  const { name, password } = req.body;
  const user = users.find((user) => user.name === name);
  if (!user) {
    return res.status(401).json({
      error: "ユーザー名あるいはパスワードが間違っています。",
    });
  }

  if (!verifyPassword(password, user.paswordDidgest)) {
    return res.status(401).json({
      error: "ユーザー名あるいはパスワードが間違っています。",
    });
  }

  const token = await generateAccessToken(user.id, user.name);
  saveToken(res, token);

  const userResponse = {
    id: user.id,
    name: user.name,
    age: user.age,
  };

  res.json({
    accessToken: token,
    data: userResponse,
  });
});

app.post("/api/v1/auth/sign_out", (_req, res) => {
  res.clearCookie("accessToken");
  res.json({
    data: "Successfully signed out",
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
