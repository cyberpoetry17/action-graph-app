import { Background as ChartBackground } from "@xyflow/react";
import { BackgroundVariant as BackgroundVariantType } from "@xyflow/react";
import {
  BACKGROUND_COLOR_DEFAULT,
  BACKGROUND_LINES_GAP_DEFAULT,
  BACKGROUND_SIZE_DEFAULT,
} from "../../../../constants";

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
  color = BACKGROUND_COLOR_DEFAULT,
  gap = BACKGROUND_LINES_GAP_DEFAULT,
  size = BACKGROUND_SIZE_DEFAULT,
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
