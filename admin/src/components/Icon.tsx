import { Box } from "@mui/material";
import { Icon } from "@iconify/react";


interface IconProps {
  icon: any;
  sx?: object;
  width?: number;
  height?: number;

}

export default function Iconr({ icon, sx, width, height, ...other }: IconProps) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...{other, width, height}} />;
}
