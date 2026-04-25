import type { Request as ExpressRequest } from "express";

export interface Request extends ExpressRequest {
  user?: {
    id: number;
    name: string;
  };
}
