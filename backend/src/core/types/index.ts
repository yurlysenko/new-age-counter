import { Request } from 'express';

export type HttpMethods = 'get' | 'post' | 'patch' | 'put' | 'delete';

export type RouteHandler = (req: Request) => unknown;
