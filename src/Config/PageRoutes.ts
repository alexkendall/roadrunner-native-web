import Solutions from "../Pages/Solutions";
import Contact from "../Pages/Contact";
import Cases from "../Pages/Cases";
import Home from "../Pages/Home";
import { ReactNode } from "react";

export interface Route {
  index: number;
  key: string;
  label: string;
  path: string;
  component: ReactNode;
  main: boolean;
}

export default {
  Page0: {
    index: 0,
    key: "home",
    label: "Home",
    path: "/",
    component: Home,
    main: true,
  },
  Page1: {
    index: 1,
    key: "solutions",
    label: "Solutions",
    path: "/solutions",
    component: Solutions,
    main: true,
  },
  Page2: {
    index: 4,
    key: "cases",
    label: "Case Studies",
    path: "/cases",
    component: Cases,
    main: true,
  },
  Page3: {
    index: 4,
    key: "contact",
    label: "Contact",
    path: "/contact",
    component: Contact,
    main: true,
  },
};

export const ScreenNavigationRoutes = {
  HOME: "Home",
  CASES: "Cases",
  SOLUTIONS: "Solutions",
  CONTACT: "Contact"
}
