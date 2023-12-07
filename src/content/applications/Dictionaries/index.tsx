import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Stack, Box } from '@mui/material';
import Footer from 'src/components/Footer';

import RecentOrders from './Dictionaries';

function ApplicationsTransactions() {
  return (
    <>
      <Helmet>
        <title>Dictionaries - Applications</title>
      </Helmet>
      <Stack spacing={4} padding={4} marginTop={5}>
        <Box height={55}>
          <PageHeader />
        </Box>
        <Box>
          <RecentOrders />
        </Box>
      </Stack>
      {/* <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container> */}
      {/* <Footer /> */}
    </>
  );
}

export default ApplicationsTransactions;
