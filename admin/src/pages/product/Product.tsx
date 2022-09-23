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
import { Link as RouterLink, useParams } from "react-router-dom";
import { Page, Icone } from "../../components";

import { ImagePreview, PriceOff } from "./styles";
import { useFetchProductQuery } from "../../framework/product/get-product";

export default function Product() {
  const [index, setIndex] = useState<string>("1");
  const [rate] = useState<number>(4);
  const { id } = useParams();
  const { isLoading, data } = useFetchProductQuery(id);
  console.log("id: ", data);
  const handleTabChange = (_: any, val: string) => {
    setIndex(val);
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h2" sx={{ mb: 5 }}>
          Product Details
        </Typography>
        <Typography variant="overline" display="block" sx={{ mb: 5 }}>
          Products &gt;
          <Typography variant="caption">{data.title}</Typography>
        </Typography>
        <Card variant="outlined" sx={{ padding: "1rem" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ImagePreview
                src={data.images[0]}
                alt={data.title}
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
                {data.inStock ? (
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
                {data.title}
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
                {data.salePrice && (
                  <PriceOff>₦ {data.price.toFixed(2)}</PriceOff>
                )}
                <Typography variant="h3" fontWeight="400">
                  ₦ {data.salePrice.toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ margin: "2rem 0" }} />
              <Box display="flex" marginY="12px">
                <Typography>Category: &nbsp;</Typography>
                <Typography variant="subtitle1">{data.category}</Typography>
              </Box>
              <Box display="flex" marginY="12px">
                <Typography>Quantity Available: &nbsp;</Typography>
                <Typography variant="subtitle1">Unlimited</Typography>
              </Box>
              <Box display="flex" marginY="12px">
                <Typography>Tags: &nbsp;</Typography>
                <Typography variant="subtitle1">
                  {data.tags.map((tag: string) => `${tag} | `)}
                </Typography>
              </Box>
              <Divider sx={{ margin: "2rem 0" }} />
              <Box display="flex" justifyContent="flex-start">
                <Button
                  size="medium"
                  variant="outlined"
                  component={RouterLink}
                  to="#"
                  style={{marginRight: '12px'}}
                  startIcon={<Icone icon="eva:edit-fill" />}
                >
                  Edit
                </Button>
                <Button
                  size="medium"
                  variant="outlined"
                  startIcon={<Icone icon="eva:trash-2-fill" />}
                >
                  Remove
                </Button>
              </Box>
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
              <Typography>{data.description}</Typography>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Page>
  );
}
