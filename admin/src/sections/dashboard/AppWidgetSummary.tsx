import { Box, Card, Typography, Stack } from "@mui/material";
import { IconifyIcon } from "@iconify/react";
import Icone from "../../components/Icon";
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@mui/material/styles";
import { formatPercent, formatNumber } from "../../utils/helpers";

interface WidgetProps {
  title: string;
  total: number;
  percent?: number;
  sx?: object;
  color?: string;
  icon?: IconifyIcon | string;
}

const IconWrapperStyle = styled("div")(({ theme }) => ({
  width: 24,
  height: 24,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

export default function AppWidgetSummary({
  title,
  total,
  icon,
  color = "primary",
  percent = 0,
  sx,
  ...other
}: WidgetProps) {
  console.log('colorL:: ', color);
  const theme = useTheme();
  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mt: 2, mb: 2 }}
        >
          <IconWrapperStyle
            sx={{
              ...(percent < 0 && {
                color: "error.main",
                bgcolor: alpha(theme.palette.error.main, 0.16),
              }),
            }}
          >
            <Icone
              icon="mdi:trending-up"
              width={16}
              height={16}
              style={{ color: "#54D62C" }}
            />
          </IconWrapperStyle>
          <Typography component="span" variant="subtitle2">
            {percent > 0 && "+"}
            {formatPercent(percent)}
          </Typography>
        </Stack>

        <Typography fontWeight="600" fontSize={28}>
          {formatNumber(total)}
        </Typography>
      </Box>
      <Icone icon={icon} width={60} height={60} style={{ color: color }} />
    </Card>
  );
}
