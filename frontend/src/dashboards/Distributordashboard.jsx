import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

function DistributorDashboard() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h3" sx={{ marginBottom: 4 }}>
        Distributor Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5">Place Orders with Manufacturers</Typography>
            <Button variant="contained" sx={{ marginTop: 2 }} component={Link} to="/distributor/orders">
              Place Orders
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5">Manage Inventory</Typography>
            <Button variant="contained" sx={{ marginTop: 2 }} component={Link} to="/distributor/inventory">
              Manage Inventory
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5">Track and Dispatch Orders</Typography>
            <Button variant="contained" sx={{ marginTop: 2 }} component={Link} to="/distributor/dispatch">
              Dispatch Orders
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DistributorDashboard;
