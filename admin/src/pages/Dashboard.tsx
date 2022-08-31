import { Grid, Container, Typography } from "@mui/material";
import { Page } from "../components";
import AppWidgetSummary from "../sections/dashboard/AppWidgetSummary";
import { VisitsByDevices, LatestOrders } from "../components/dashboard";
import "chart.js/auto";

const summary = [
  {
    title: "Average Sales",
    total: 1742,
    percent: 2.5,
    color: "#5800FF",
    icon: "ant-design:android",
  },
  {
    title: "All Customers",
    total: 2345,
    percent: 11.2,
    color: "#0096FF",
    icon: "ant-design:android",
  },
  {
    title: "Average Orders",
    total: 341,
    percent: 21.3,
    color: "#00D7FF",
    icon: "ant-design:android",
  },
  {
    title: "All Products",
    total: 11234,
    percent: 33.6,
    color: "#79DAE8",
    icon: "ant-design:android",
  },
];

export default function Dashboard() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          {summary.map((summary, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <AppWidgetSummary
                title={summary.title}
                total={summary.total}
                icon={summary.icon}
                color={summary.color}
                percent={summary.percent}
              />
            </Grid>
          ))}
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
