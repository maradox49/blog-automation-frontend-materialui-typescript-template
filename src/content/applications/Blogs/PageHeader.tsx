import { Typography, Button, Grid } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Search } from '@mui/icons-material';

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h2" component="h2" gutterBottom>
          Blog Listing
        </Typography>
      </Grid>
      <Grid item>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start"><Search color='primary'/></InputAdornment>}
            placeholder='Search here'
          />
        {/* <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Search Input
        </Button> */}
      </Grid>
    </Grid>
  );
}

export default PageHeader;
