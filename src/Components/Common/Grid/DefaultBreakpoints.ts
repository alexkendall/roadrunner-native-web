import { Breakpoint } from "./Breakpoint";

const b1 = new Breakpoint({ cols: 1, min_width: 0 });
const b2 = new Breakpoint({ cols: 1, min_width: 500 });
const b3 = new Breakpoint({ cols: 3, min_width: 1000 });
const b4 = new Breakpoint({ cols: 4, min_width: 1500 });
const b5 = new Breakpoint({ cols: 5, min_width: 2000 });

export default [b1, b2, b3, b4, b5];
