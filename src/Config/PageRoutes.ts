import Contact from "../Pages/Contact";
import Cases from "../Pages/Cases";
import Home from "../../app/home";
import { ReactNode } from "react";
import About from "../../app/about";

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
    key: "about",
    label: "About",
    path: "/about",
    component: About,
    main: true,
  },
  Page2: {
    index: 4,
    key: "clients",
    label: "Clients",
    path: "/clients",
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
  HOME: "roadrunner",
  CASES: "clients",
  ABOUT: "about",
  CONTACT: "contact"
}
