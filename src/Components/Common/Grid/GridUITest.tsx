import Grid from "./index";
import {
  Breakpoint,
  type BreakpointList,
} from "./Breakpoint";
import { connect } from "react-redux";
import { RootState } from "../../../Redux/Store";

const mapStateToProps = (state: RootState) => {
  return {
    content_width: state.window.content_width,
    content_height: state.window.content_height,
  };
};

interface Props {
  content_width: number;
  content_height: number;
}

const GridUITest = ({ content_height, content_width }: Props) => {
  const gridStyle = {
    backgroundColor: "black",
    display: "flex",
    flex: 1,
    margin: 5,
  };
  const gridComponent = <div style={gridStyle} />;
  const b1 = new Breakpoint({ cols: 1, min_width: 0 });
  const b2 = new Breakpoint({ cols: 2, min_width: 500 });
  const b3 = new Breakpoint({ cols: 3, min_width: 1000 });
  const b4 = new Breakpoint({ cols: 4, min_width: 1500 });
  const b5 = new Breakpoint({ cols: 5, min_width: 2000 });
  const breakpoints: BreakpointList = [b1, b2, b3, b4, b5];
  return (
    <Grid
      width={content_width}
      height={content_height}
      breakpointList={breakpoints}
    >
      {gridComponent}
      {gridComponent}
      {gridComponent}
      {gridComponent}
      {gridComponent}
      {gridComponent}
      {gridComponent}
      {gridComponent}
      {gridComponent}
    </Grid>
  );
};

export default connect(mapStateToProps)(GridUITest);
