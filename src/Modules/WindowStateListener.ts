type WindowDimensionTpe = {
  height: number,
  width: number,
}
type WindowStateHandler = (state: WindowDimensionTpe) => void;

export function addWindowStateListener(handler: WindowStateHandler) {
  window.addEventListener("resize", () => {
    const height: number = window.innerHeight;
    const width: number = window.innerWidth;
    handler({ height, width });
  });
}

export function removeWindowStateListener(handler: WindowStateHandler) {
  window.removeEventListener("resize", handler);
}
