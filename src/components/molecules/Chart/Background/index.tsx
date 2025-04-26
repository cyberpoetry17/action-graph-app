import { Background as ChartBackground } from "@xyflow/react";
import { BackgroundVariant as BackgroundVariantType } from "@xyflow/react";

export type BackgroundProps = {
  variant?: BackgroundVariantType;
  id?: string;
  color?: string;
  gap?: number | [number, number];
  size?: number;
};

const Background = ({
  variant = BackgroundVariantType.Lines,
  id,
  color = "#e0e0e0",
  gap = 20,
  size = 1,
}: BackgroundProps) => {
  return (
    <ChartBackground
      id={id}
      variant={variant}
      color={color}
      gap={gap}
      size={size}
    />
  );
};

export default Background;
