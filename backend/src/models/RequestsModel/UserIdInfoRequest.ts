import { Request } from "express";

export interface UserIdInfoRequest extends Request {
    userId?: number;
}
