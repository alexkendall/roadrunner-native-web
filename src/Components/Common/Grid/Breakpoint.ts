export interface BreakpointData {
  cols: number,
  min_width: number,
}

export class Breakpoint {

  cols: number;
  min_width: number;

  constructor(json: any) {
    this.cols = json?.cols || 1;
    this.min_width = json?.min_width || 0;
  }
}

export type BreakpointList = Array<Breakpoint>;

export type ViewModel = Array<Array<any>>;

export const getColumns = (
  breakpointList: BreakpointList,
  width: number
): number => {
  const breaks = breakpointList.sort((b1, b2) => {
    return b1.min_width - b2.min_width;
  });
  let running = 1;
  breaks.forEach((b) => {
    if (width >= b.min_width) {
      running = b.cols;
    }
  });
  return running;
};

export const constructViewModel = (
  breakpointList: BreakpointList,
  width: number,
  children: Array<any>
): ViewModel => {
  const n: number = getColumns(breakpointList, width);
  const result: ViewModel = [];
  for (let i = 0; i < children.length; i += n) {
    const group: Array<any> = [];
    for (let j = 0; j < n && j + i < children.length; ++j) {
      if (i < children.length) {
        group.push({ element: children[j + i], index: j + i });
      }
    }
    result.push(group);
  }
  return result;
};
