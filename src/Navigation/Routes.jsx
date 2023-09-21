import WEB_PAGES from "../pages";
import PublicRoute from "./Routes/PublicRoute";

const AUTH_ROUTES = [
  {
    name: "Users",
    path: "/users",
    page: <WEB_PAGES.USERS />,
    routeType: PublicRoute,
  },
  {
    name: "User Detail",
    path: "/users/:id",
    page: <WEB_PAGES.USER_DETAIL />,
    routeType: PublicRoute,
  },
];

const ROUTES = [
  ...AUTH_ROUTES,
];

export default ROUTES;
