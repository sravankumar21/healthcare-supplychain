import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const services = [
  { title: "Admin", description: "Manage users, track activity, and generate reports for orders, inventory, and users.", path: "/login" },
  { title: "Manufacturer", description: "View and manage production, receive and process orders from distributors, and manage inventory.", path: "/login" },
  { title: "Distributor", description: "Place orders with manufacturers, manage inventory, and track and dispatch orders to pharmacies.", path: "/login" },
  { title: "Pharma (Pharmacy)", description: "Place orders with distributors, track order status, and view order history.", path: "/login" },
];

function ServicesPage() {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path); // Navigate to the login page with selected role path
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        minHeight: "100vh", // Full viewport height to center vertically
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: 4 }}>
        Our Services
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                minHeight: 150,
                textAlign: "center",
                cursor: "pointer", // Indicate that it's clickable
                "&:hover": {
                  backgroundColor: "#f1f1f1", // Hover effect
                },
              }}
              onClick={() => handleCardClick(service.path)} // Navigate to login page on card click
            >
              <CardContent>
                <Typography variant="h5" sx={{ marginBottom: 1 }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ServicesPage;
