import express from "express";

export interface AuthenticatedRequest extends express.Request {
  identity?: {
    _id: string;
    email: string;
    reference?: string;
    role: "admin" | "office" | "user";
  };
}
