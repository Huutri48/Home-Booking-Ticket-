import React, { lazy } from "react";
import HomeTemplate from "containers/HomeTemplate";


const routesHome = [
  {
    exact: true,
    path: "/",
    component: lazy(() => import("containers/HomeTemplate/HomePage")),
  },
  {
    exact: false,
    path: "/support",
    component: lazy(() => import("containers/HomeTemplate/Support")),
  },
  {
    exact: false,
    path: "/list-movie",
    component: lazy(() => import("containers/HomeTemplate/ListMoviePage")),
  },
  {
    exact: false,
    path: "/information",
    component: lazy(() => import("containers/HomeTemplate/InfoAcc")),
  },

  {
    exact: false,
    path: "/detail/:id",
    component: lazy(() => import("containers/HomeTemplate/DetailMoviePage")),
  },
  
  {
    exact: false,
    path: "/bookingticket/:id",
    component: lazy(() => import("containers/HomeTemplate/BookingTicket")),
  },
  
];


export function RoutesHome() {
  return routesHome.map((route, index) => (
    <HomeTemplate
      key={index}
      exact={route.exact}
      path={route.path}
      Component={route.component}
    />
  ));
}

