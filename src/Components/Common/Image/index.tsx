import { useCallback, useState } from "react";
import { View, Text, Image } from 'react-native'

interface Props {
  alt: string;
  src: string;
  style: Object;
  hoverOverlay?: string;
  greyscaleEnabled?: boolean;
  greyscaleOpacity?: number;
  hoverImage?: string;
  overlayTitle?: string;
  overlayLabel?: string;
}

export default ({
  alt,
  src,
  style,
  greyscaleEnabled,
  greyscaleOpacity,
  hoverImage,
  overlayTitle,
  overlayLabel,
}: Props) => {
  const [hovering, setHovering] = useState(false);

  const onMouseOver = useCallback(() => {
    setHovering(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHovering(false);
  }, []);

  const renderImage = useCallback(() => {
    let source: string = src;
    if (hoverImage) {
      source = hovering ? hoverImage : src;
    }
    return (
      <Image
        source={{ uri: source }}
        style={{
          objectFit: "cover",
          height: "100%",
          width: "100%",
          margin: 0,
          backgroundColor: "black",
        }}
        alt={alt}
      />
    );
  }, [src, hoverImage, alt]);

  const renderTitleLabel = useCallback(() => {
    return (
      <View>
        <Text style={{ color: "white", fontSize: 20, fontFamily: "Roboto" }}>
          {overlayTitle}
        </Text>
        <Text style={{ color: "white", fontSize: 16, fontFamily: "Roboto" }}>
          {overlayLabel}
        </Text>
      </View>
    );
  }, [overlayTitle, overlayLabel]);

  const renderOverlay = useCallback(() => {
    if (!greyscaleEnabled) {
      return (
        <View
          style={{
            ...style,
            position: "absolute",
            margin: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderTitleLabel()}
        </View>
      );
    }
    const backgroundColor: string =
      "rgba(0,0,0," + (greyscaleOpacity ?? 0.5).toString() + ")";
    return (
      <View
        style={{
          ...style,
          position: "absolute",
          backgroundColor: backgroundColor,
          margin: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {renderTitleLabel()}
      </View>
    );
  }, [greyscaleEnabled]);

  const overlay = hovering ? renderOverlay() : null;
  return (
    <View
      style={{
        ...style,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {renderImage()}
      {overlay}
    </View>
  );
};
