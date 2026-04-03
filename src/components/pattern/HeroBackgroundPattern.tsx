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
      return `radial-gradient(${fill} 1px, transparent 1px)`;
    case "grid":
      return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case "diagonal-stripes":
      return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`;
    case "horizontal-lines":
      return `linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case "vertical-lines":
      return `linear-gradient(to right, ${fill} 1px, transparent 1px)`;
    case "checkerboard":
      return `linear-gradient(45deg, ${fill} 25%, transparent 25%), linear-gradient(-45deg, ${fill} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${fill} 75%), linear-gradient(-45deg, transparent 75%, ${fill} 75%)`;
    default:
      return undefined;
  }
}

const BGPattern = ({
  variant = "grid",
  mask = "none",
  size = 70,
  maskSize = 120, // Default spread
  className,
  style,
  ...props
}: BGPatternProps) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    const theme = localStorage.getItem("theme") || null;
    theme === null && localStorage.setItem("theme", "dark");
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Improved colors for better visibility
  const fill = theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.1)";
  const bgSize = `${size}px ${size}px`;
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

  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 h-full w-full pointer-events-none",
        className,
      )}
      style={{
        backgroundImage,
        backgroundSize: bgSize,
        WebkitMaskImage: getMaskImage(),
        maskImage: getMaskImage(),
        ...style,
      }}
      {...props}
    />
  );
};

BGPattern.displayName = "BGPattern";
export { BGPattern };
