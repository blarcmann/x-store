import { Box } from "@mui/material";
import { Icon } from "@iconify/react";

interface IconProps {
  icon: any;
  sx?: object;
  width?: number;
  height?: number;
  style?: any;
}

export default function Iconr({
  icon,
  sx,
  width,
  height,
  style,
  ...other
}: IconProps) {
  return (
    <Box
      component={Icon}
      icon={icon}
      sx={{ ...sx }}
      {...{ other, width, height }}
      style={style}
    />
  );
}
