import { Container, Grid, Stack, Typography } from "@mui/material";
import Page from "../components/Page";
import { AccountDetails, AccountProfile } from "../components/account";

const Account = () => (
  <Page title="User">
    <Container>
      <Stack mb={5}>
        <Typography variant="h2" gutterBottom>
          Account
        </Typography>
      </Stack>
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <AccountProfile />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <AccountDetails />
        </Grid>
      </Grid>
    </Container>
  </Page>
);

export default Account;
