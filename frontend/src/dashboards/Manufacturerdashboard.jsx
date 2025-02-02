import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

function ManufacturerDashboard() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h3" sx={{ marginBottom: 4 }}>
        Manufacturer Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5">Manage Production</Typography>
            <Button variant="contained" sx={{ marginTop: 2 }} component={Link} to="/manufacturer/production">
              View Production
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5">Orders from Distributors</Typography>
            <Button variant="contained" sx={{ marginTop: 2 }} component={Link} to="/manufacturer/orders">
              Process Orders
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5">Manage Distributors</Typography>
            <Button variant="contained" sx={{ marginTop: 2 }} component={Link} to="/manufacturer/distributors">
              Manage Distributors
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5">Track Inventory</Typography>
            <Button variant="contained" sx={{ marginTop: 2 }} component={Link} to="/manufacturer/inventory">
              View Inventory
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ManufacturerDashboard;
