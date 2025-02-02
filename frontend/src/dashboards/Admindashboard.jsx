import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h3" sx={{ marginBottom: 4 }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5">User Management</Typography>
            <Button variant="contained" sx={{ marginTop: 2 }} component={Link} to="/admin/users">
              Manage Users
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5">Activity Logging</Typography>
            <Button variant="contained" sx={{ marginTop: 2 }} component={Link} to="/admin/logs">
              View Logs
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5">Report Generation</Typography>
            <Button variant="contained" sx={{ marginTop: 2 }} component={Link} to="/admin/reports">
              Generate Reports
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminDashboard;
