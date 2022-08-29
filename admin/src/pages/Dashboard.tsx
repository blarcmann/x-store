import { Grid, Container, Typography } from "@mui/material";
import { Page } from "../components";
import AppWidgetSummary from "../sections/dashboard/AppWidgetSummary";
import { VisitsByDevices, LatestOrders } from "../components/dashboard";
import "chart.js/auto";

export default function Dashboard() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Weekly Sales"
              total={714000}
              icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="New Customers"
              total={1352831}
              color="info"
              icon={"ant-design:apple-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Orders"
              total={1723315}
              color="warning"
              icon={"ant-design:windows-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Bug Reports"
              total={234}
              color="error"
              icon={"ant-design:bug-filled"}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={4}>
          <Grid item lg={8} md={7} xs={12}>
            <LatestOrders />
          </Grid>
          <Grid item lg={4} md={5} xs={12}>
            <VisitsByDevices sx={{ height: "100%" }} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
