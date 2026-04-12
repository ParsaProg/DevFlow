"use client";

import { cn } from "@/src/utils/tailwindCn";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

type BGVariantType =
  | "dots"
  | "diagonal-stripes"
  | "grid"
  | "horizontal-lines"
  | "vertical-lines"
  | "checkerboard";
type BGMaskType =
  | "fade-center"
  | "fade-edges"
  | "fade-top"
  | "fade-bottom"
  | "fade-left"
  | "fade-right"
  | "fade-x"
  | "fade-y"
  | "none";

type BGPatternProps = React.ComponentProps<"div"> & {
  variant?: BGVariantType;
  mask?: BGMaskType;
  size?: number; // Size of the pattern (px)
  maskSize?: number; // Control the spread/roundness (0-100)
};

function getBgImage(variant: BGVariantType, fill: string, size: number) {
  switch (variant) {
    case "dots":
      return `radial-gradient(circle at center, ${fill} 1.5px, transparent 1.5px)`;
    case "grid":
      return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case "diagonal-stripes":
      return `repeating-linear-gradient(45deg, ${fill}, ${fill} 2px, transparent 2px, transparent ${size}px)`;
    case "horizontal-lines":
      return `repeating-linear-gradient(to bottom, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`;
    case "vertical-lines":
      return `repeating-linear-gradient(to right, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`;
    case "checkerboard":
      return `linear-gradient(45deg, ${fill} 25%, transparent 25%), linear-gradient(-45deg, ${fill} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${fill} 75%), linear-gradient(-45deg, transparent 75%, ${fill} 75%)`;
    default:
      return undefined;
  }
}

const BGPattern = ({
  variant = "grid",
  mask = "none",
  size = 123,
  maskSize = 123,
  className,
  style,
  ...props
}: BGPatternProps) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Use resolvedTheme to get actual theme value
  const currentTheme = resolvedTheme || theme || "dark";
  
  // Improved colors for better visibility
  const fill = currentTheme === "dark" 
    ? "rgba(255, 255, 255, 0.08)"  // Increased opacity for dark mode
    : "rgba(0, 0, 0, 0.06)";       // Increased opacity for light mode
  
  const bgSize = variant === "checkerboard" ? `${size/2}px ${size/2}px` : `${size}px ${size}px`;
  const backgroundImage = getBgImage(variant, fill, size);

  // Dynamic Mask Logic
  const getMaskImage = () => {
    const tightStop = Math.max(0, maskSize - 30);
    switch (mask) {
      case "fade-edges":
        return `radial-gradient(ellipse at center, black ${tightStop}%, transparent ${maskSize}%)`;
      case "fade-center":
        return `radial-gradient(ellipse at center, transparent ${tightStop}%, black ${maskSize}%)`;
      case "fade-top":
        return `linear-gradient(to bottom, transparent, black ${maskSize}%)`;
      case "fade-bottom":
        return `linear-gradient(to top, transparent, black ${maskSize}%)`;
      case "fade-left":
        return `linear-gradient(to right, transparent, black ${maskSize}%)`;
      case "fade-right":
        return `linear-gradient(to left, transparent, black ${maskSize}%)`;
      case "fade-x":
        return `linear-gradient(to right, transparent, black, transparent)`;
      case "fade-y":
        return `linear-gradient(to bottom, transparent, black, transparent)`;
      default:
        return "none";
    }
  };

  const maskImage = getMaskImage();
  const backgroundStyles: React.CSSProperties = {
    backgroundImage,
    backgroundSize: bgSize,
    backgroundRepeat: variant === "checkerboard" ? "repeat" : "repeat",
    ...style,
  };

  // Apply mask only if not 'none'
  if (mask !== "none" && maskImage !== "none") {
    backgroundStyles.WebkitMaskImage = maskImage;
    backgroundStyles.maskImage = maskImage;
  }

  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 h-full w-full pointer-events-none",
        className,
      )}
      style={backgroundStyles}
      {...props}
    />
  );
};

BGPattern.displayName = "BGPattern";
export { BGPattern };