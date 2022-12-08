export {};

declare global {
  namespace Express {
    interface Request {
      allRoutes: any;
    }
  }
}
