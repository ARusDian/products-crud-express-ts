import { Request } from "express";

export interface RoleInfoRequest extends Request {
    role?: number;
}
