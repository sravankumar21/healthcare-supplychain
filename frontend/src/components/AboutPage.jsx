import { Container, Typography, Paper } from "@mui/material";

function AboutPage() {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex", // Use flexbox for centering
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        textAlign: "center", // Center text
        minHeight: "100vh", // Full height of viewport
        marginTop: 4,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h3" sx={{ marginBottom: 2 }}>
          About MedCare
        </Typography>
        <Typography variant="body1" color="text.secondary">
          MedCare is a leading provider of healthcare supply chain solutions. 
          Our mission is to ensure that medical supplies, pharmaceuticals, and 
          healthcare logistics are efficiently managed and delivered to hospitals, 
          clinics, and pharmacies.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2 }}>
          With our advanced technology and logistics network, we help healthcare 
          providers streamline their supply chain processes, reduce costs, and 
          improve patient care.
        </Typography>
      </Paper>
    </Container>
  );
}

export default AboutPage;
