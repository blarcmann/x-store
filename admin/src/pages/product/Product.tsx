import { useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Chip,
  Box,
  Rating,
  Divider,
  Button,
  Card,
  Tab,
} from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Page, ColorPreview, Icone } from "../../components";

const ImagePreview = styled("img")(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  width: "100%",
  height: "auto",
}));

const BorderedBox = styled("div")(({ theme }) => ({
  borderRadius: theme.spacing(0.75),
  border: "1px solid",
  borderColor: theme.palette.grey[400],
  padding: "0.75rem 1rem",
}));

const CenteredBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(3),
}));

const PriceOff = styled("h2")(({ theme }) => ({
  textDecoration: "line-through",
  fontWeight: "600",
  marginRight: theme.spacing(1),
  color: theme.palette.grey[500],
  fontSize: theme.typography.pxToRem(32),
}));

const productDetails = {
  title: "Nike air force 1 ndestrukt",
  inStock: true,
  price: 99.99,
  discount: 10,
  colors: ["#2e3aeb", "#00aded", "#89FF2e", "#ed6b00"],
  qtyAvailable: 18,
};

export default function Product() {
  const [index, setIndex] = useState<string>("1");
  const [rate] = useState<number>(4);
  const { title, inStock, price, discount, colors, qtyAvailable } =
    productDetails;

  const handleTabChange = (_: any, val: string) => {
    setIndex(val);
  };

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Product Details
        </Typography>
        <Typography variant="overline" display="block" sx={{ mb: 5 }}>
          Products &gt;
          <Typography variant="caption">{title}</Typography>
        </Typography>
        <Card variant="outlined" sx={{ padding: "1rem" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ImagePreview
                src={require("../assets/product_1.jpeg")}
                alt={title}
                loading="lazy"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{ paddingTop: "2rem !important", marginLeft: "5%" }}
            >
              <Box mb={2}>
                {inStock ? (
                  <Chip label={"in stock".toUpperCase()} color="secondary" />
                ) : (
                  <Chip label={"out of stock".toUpperCase()} color="error" />
                )}
              </Box>
              <Typography
                variant="h3"
                gutterBottom
                component="div"
                marginBottom={2}
                sx={{ fontWeight: "400" }}
              >
                {title}
              </Typography>
              <Box display="flex" alignItems="center" flexDirection="row">
                <Rating
                  name="product rating"
                  size="large"
                  readOnly
                  value={rate}
                  sx={{ marginRight: "0.5rem" }}
                />
                <Typography>(492 Reviews)</Typography>
              </Box>
              <Box display="flex" marginTop={2}>
                {discount && <PriceOff>${price}</PriceOff>}
                <Typography variant="h3">
                  ${(price - (discount / 100) * price).toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ margin: "2rem 0" }} />
              <CenteredBox>
                <Typography>Colors</Typography>
                <BorderedBox>
                  <ColorPreview colors={colors} />
                </BorderedBox>
              </CenteredBox>
              <CenteredBox>
                <Typography>Quantity Available</Typography>
                <BorderedBox>
                  <Typography>{qtyAvailable} pcs</Typography>
                </BorderedBox>
              </CenteredBox>
              <Divider sx={{ margin: "2rem 0" }} />
              <CenteredBox>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  component={RouterLink}
                  to="#"
                  startIcon={<Icone icon="eva:edit-fill" />}
                >
                  Edit Product
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  color="error"
                  startIcon={<Icone icon="eva:trash-2-fill" />}
                >
                  Remove Product
                </Button>
              </CenteredBox>
            </Grid>
          </Grid>
        </Card>
        <Box marginTop={5}>
          <TabContext value={index}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Description" value="1" />
                <Tab label="Review" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Typography>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Typography>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Page>
  );
}
