import {
  Breakpoint,
  getColumns,
  type BreakpointList,
  constructViewModel
} from "./Breakpoint";

const b1 = new Breakpoint({ cols: 1, min_width: 0 });
const b2 = new Breakpoint({ cols: 2, min_width: 500 });
const b3 = new Breakpoint({ cols: 3, min_width: 1000 });
const b4 = new Breakpoint({ cols: 4, min_width: 1500 });
const b5 = new Breakpoint({ cols: 5, min_width: 2000 });

const breakpoints: BreakpointList = [b1, b2, b3, b4, b5];

getColumns(breakpoints, 0);
getColumns(breakpoints, 250);
getColumns(breakpoints, 500);
getColumns(breakpoints, 1000);
getColumns(breakpoints, 1250);
getColumns(breakpoints, 1750);
getColumns(breakpoints, 2000);
getColumns(breakpoints, 3000);

/*
let VM = constructViewModel(breakpoints, 0, [
  "c0",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
]);
let VM = constructViewModel(breakpoints, 1250, [
  "c0",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
]);
*/

const VM = constructViewModel(breakpoints, 3000, [
  "c0",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9"
]);

console.log("VM", VM);
