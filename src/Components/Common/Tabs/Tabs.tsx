import { useCallback } from "react";
import Tab from "./Tab";

interface TabModel {
  index: number;
  label: string;
  path: string;
}

const DefaultStyle: Record<string, any> = {
  display: "flex",
  flexDirection: "row",
  flex: 1,
  color: "white",
  zIndex: 100,
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: 20,
  paddingRight: 20,
};

interface Props {
  hoverColor: string;
  color: string;
  backgroundColor: string;
  containerStyle: string;
  tabs: Array<TabModel>;
  onTabSelect?: (tab: TabModel) => void;
  siteLogo: string;
}

export default ({
  hoverColor,
  color,
  backgroundColor,
  containerStyle,
  tabs,
  onTabSelect,
  siteLogo,
}: Props) => {
  const onUserTabSelect = (tab: TabModel) => {
    if (onTabSelect) {
      onTabSelect(tab);
    }
    window.scrollTo(0, 0);
    window.location.pathname = tab.path;
  };

  const renderSiteLogo = useCallback(() => {
    return (
      <img
        alt={""}
        src={siteLogo}
        style={{ height: 40, position: "absolute", left: 17, top: 17 }}
      />
    );
  }, [siteLogo]);

  return (
    <View className={"Tabs"} style={containerStyle ?? DefaultStyle}>
      {renderSiteLogo()}
      <View style={containerStyle ?? DefaultStyle}>
        {tabs.map((tab, index) => {
          return (
            <Tab
              key={index}
              backgroundColor={backgroundColor}
              onClick={() => {
                onUserTabSelect(tab);
              }}
              isSelected={window.location.pathname === tab.path}
              color={window.location.pathname === tab.path ? hoverColor : color}
              hoverColor={hoverColor}
              index={index}
              label={tab.label}
            />
          );
        })}
      </View>
    </View>
  );
};
