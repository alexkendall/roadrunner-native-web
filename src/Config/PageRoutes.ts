import Contact from "../Pages/Contact";
import Cases from "../Pages/Cases";
import { Content } from "../Pages/Content";
import Home from "../Pages/Home";
import { ReactNode } from "react";
import About from "../Pages/About";
import { Photography } from "../Pages/Photography";

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
  Page4: {
    index: 4,
    key: "content",
    label: "Conntent",
    path: "/content",
    component: Content,
    main: true  ,
  },
  Page5: {
    index: 4,
    key: "photography",
    label: "Photography",
    path: "/photography",
    component: Photography,
    main: true,
  },
};

export const ScreenNavigationRoutes = {
  HOME: "Roadrunner Creative",
  CASES: "Software",
  ABOUT: "About",
  CONTACT: "Contact",
  CONTENT: "Content",
  PHOTOGRAPHY: "Photography",

}
