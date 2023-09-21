import React from "react";
import NoPageFound from "./NoPageFound";

const USERS = React.lazy(() => import("./Users/usersList"));
const USER_DETAIL = React.lazy(() => import("./Users/userDetail"));

const WEB_PAGES = {
  USERS,
  USER_DETAIL,

  // Mo page found
  NO_PAGE_FOUND: NoPageFound,
};
export default WEB_PAGES;
