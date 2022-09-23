import { styled } from "@mui/material/styles";

export const ImagePreview = styled("img")(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  width: "100%",
  height: "auto",
}));

export const BorderedBox = styled("div")(({ theme }) => ({
  borderRadius: theme.spacing(0.75),
  border: "1px solid",
  borderColor: theme.palette.grey[400],
  padding: "0.75rem 1rem",
}));

export const CenteredBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(3),
}));

export const PriceOff = styled("h4")(({ theme }) => ({
  textDecoration: "line-through",
  fontWeight: "400",
  marginRight: theme.spacing(1),
  color: theme.palette.grey[500],
  fontSize: theme.typography.pxToRem(24),
}));
