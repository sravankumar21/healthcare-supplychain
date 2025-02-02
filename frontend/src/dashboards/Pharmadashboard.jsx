import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

function PharmaDashboard() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h3" sx={{ marginBottom: 4 }}>
        Pharma Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5">Place Orders with Distributors</Typography>
            <Button variant="contained" sx={{ marginTop: 2 }} component={Link} to="/pharma/orders">
              Place Orders
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5">Track Order Status</Typography>
            <Button variant="contained" sx={{ marginTop: 2 }} component={Link} to="/pharma/track">
              Track Orders
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5">View Order History</Typography>
            <Button variant="contained" sx={{ marginTop: 2 }} component={Link} to="/pharma/history">
              View History
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PharmaDashboard;
