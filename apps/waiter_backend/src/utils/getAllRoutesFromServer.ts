import { SERVER, API_BASE } from "../configs/configs";

export function getAllRoutesFromServer(server: any) {
  let route = "";
  const allRoutesArr: any[] = [];

  server._router.stack.forEach(function (middleware: any) {
    if (middleware.route) {
      allRoutesArr.push(middleware.route);
    } else if (middleware.name === "router") {
      middleware.handle.stack.forEach(function (handler: any) {
        route = handler.route;
        route && allRoutesArr.push(route);
      });
    }
  });

  const apiRoutesArr = allRoutesArr.map((item) => [
    item.path,
    Object.keys(item.methods)[0],
    item.stack[0].name,
  ]);

  const fullUrl = SERVER;

  const allRoutesObj: any = {};
  let lastCategory = "";
  let categoryObj: any = {};

  const avoidComparingError = (route1: string, route2: string) =>
    route1 === route2;

  for (const curRoute of apiRoutesArr) {
    const [route, method, fnName] = curRoute;

    const fRoute = avoidComparingError(API_BASE, "/")
      ? route
      : route.slice(API_BASE["length"]);

    const splitedRouteArr = fRoute.split("/");
    const curCategory = splitedRouteArr[1];
    if (!curCategory || curCategory === "") {
      continue;
    }

    if (curCategory !== lastCategory && lastCategory !== "") {
      allRoutesObj[lastCategory] = categoryObj;
      categoryObj = {};
    }

    lastCategory = curCategory;
    categoryObj[
      `[${method.toString().toUpperCase()}] ${fnName}`
    ] = `${fullUrl}${route}`;
  }

  allRoutesObj[lastCategory] = categoryObj;

  return allRoutesObj;
}
