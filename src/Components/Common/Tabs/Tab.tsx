import { useState, useCallback } from "react";
import { View, Text } from 'react-native'

interface Props {
  hoverColor: string;
  color: string;
  backgroundColor: string;
  label: string;
  onClick: () => void;
  path: string;
  isSelected: boolean;
}

export default ({
  hoverColor,
  color,
  label,
  onClick,
  isSelected,
}: Props) => {
  const [hovering, setHovering] = useState(false);

  const onUserClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const onMouseOver = useCallback(() => {
    setHovering(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHovering(false);
  }, []);

  const renderOnHover = useCallback(() => {
    return (
      <Text
        style={{
          fontStyle: "italic",
          fontSize: 18,
          fontFamily: "Menlo",
          textDecoration: "line-through",
          color: hoverColor,
          cursor: "pointer",
          fontWeight: "800",
          margin: 0,
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        {label.toUpperCase()}
      </Text>
    );
  }, [hoverColor, label]);

  const renderDefault = useCallback(() => {
    return (
      <h3
        style={{
          fontStyle: "italic",
          fontSize: 18,
          fontFamily: "Menlo",
          color: color,
          cursor: "pointer",
          fontWeight: "800",
          margin: 0,
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        {label.toUpperCase()}
      </h3>
    );
  }, [label, color]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onUserClick}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {hovering || isSelected ? renderOnHover() : renderDefault()}
    </View>
  );
};
