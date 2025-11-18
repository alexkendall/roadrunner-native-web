import React, { ReactNode } from "react";
import { View } from 'react-native'
import {
  type BreakpointList,
  constructViewModel,
  ViewModel,
} from "./Breakpoint";

interface Props {
  children: Array<React.Component<ReactNode>>;
  breakpointList: BreakpointList;
  width: number;
  height: number;
}

const Grid = ({ children, breakpointList, width, height }: Props) => {
  const viewModel: ViewModel = constructViewModel(
    breakpointList,
    width,
    children
  );
  return (
    <View
      style={{
        overflow: "scroll",
        overflowX: "hidden",
        backgroundColor: "grey",
        display: "flex",
        flexDirection: "column",
        height: height,
        width: width,
      }}
    >
      {viewModel.map((group, index) => {
        return (
          <View
            key={index}
            style={{ display: "flex", flexDirection: "row", flex: 1 }}
          >
            {group.map((elt) => {
              const child = children[elt.index];
              return child;
            })}
          </View>
        );
      })}
    </View>
  );
};

export default Grid;
