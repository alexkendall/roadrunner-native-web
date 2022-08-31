import { Dimensions } from "react-native";

type WindowDimensionTpe = {
  height: number,
  width: number,
}
type WindowStateHandler = (state: WindowDimensionTpe) => void;

export function addWindowStateListener(handler: WindowStateHandler) {
  const { height, width } = Dimensions.get('window')
  handler({ height, width });
}

export function removeWindowStateListener(handler: WindowStateHandler) {
  //window.removeEventListener("resize", handler);
}
