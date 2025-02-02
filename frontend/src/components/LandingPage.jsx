import { Container, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import video from '../videos/healthcare.mp4';
import featuresImage from '../images/medicine.jpg'; // Replace with your actual image

function LandingPage() {
  return (
    <>
      {/* Landing Page Video Section */}
      <Container 
        maxWidth={false} 
        disableGutters 
        sx={{ 
          position: "relative", 
          width: "99vw", 
          height: "70vh",  // Ensured video height remains unchanged
          overflow: "hidden", 
          display: "flex", 
          alignItems: "center" 
        }}
      >
        {/* Background Video */}
        <video 
          src={video} 
          autoPlay 
          loop 
          muted 
          style={{ 
            width: "99vw", 
            height: "100%", 
            objectFit: "cover", 
            position: "absolute", 
            top: 0, 
            left: 0, 
            zIndex: -1 
          }} 
        />
        
        {/* Text Content */}
        <Container 
          sx={{ 
            position: "relative", 
            zIndex: 1, 
            color: "darkblue", 
            textAlign: "left",
            paddingLeft: "3vw"
          }}
        >
          <Typography variant="h3" sx={{ marginBottom: 2, fontFamily: "'Smooch Sans', sans-serif" }}>
            Welcome to PharmaCare
          </Typography>
          <Typography variant="h5" sx={{ fontFamily: "'Smooch Sans', sans-serif" }}>
            Your trusted partner in healthcare supply chain management.
          </Typography>
        </Container>
      </Container>

      {/* Features Section (Full Width) */}
      <Box 
        sx={{ 
          width: "100vw",  // Ensures full width
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          padding: "5vw", 
          backgroundColor: "#f5f5f5" 
        }}
      >
        {/* Left Side - Features List */}
        <Box sx={{ width: "50%" }}>
          <Typography variant="h4" sx={{ fontFamily: "'Smooch Sans', sans-serif", fontSize: "2rem", marginBottom: 2, color: "#1976d2",marginLeft: "10vh" }}>
            Our Features
          </Typography>
          <List>
            {[
              "Real-time stock tracking for pharmacies",
              "Efficient supplier and distributor management",
              "Automated order and billing system",
              "Secure patient data encryption",
              "24/7 chatbot assistance for customer queries",
            ].map((feature, index) => (
              <ListItem key={index}>
                <ListItemText 
                  primary={feature} 
                  sx={{ fontSize: "1.2rem", fontFamily: "'Smooch Sans', sans-serif",marginLeft: "10vh" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right Side - Features Image */}
        <Box sx={{ width: "50%", display: "flex", justifyContent: "center" }}>
          <img 
            src={featuresImage} 
            alt="Features" 
            style={{ width: "60%", height: "60%", borderRadius: "10px",marginRight: "40vh" }}
          />
        </Box>
      </Box>

      {/* Footer Section */}
      <Box 
        sx={{ 
          width: "100vw", 
          backgroundColor: "#1976d2", 
          color: "#fff", 
          padding: "2vw", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          flexDirection: "column" 
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "1vw" }}>
          PharmaCare © 2025 | All Rights Reserved
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "1rem" }}>
          For more information, visit our{" "}
          <a href="https://www.pharmacare.com" style={{ color: "#fff", textDecoration: "underline" }}>
            website
          </a>
        </Typography>
      </Box>
    </>
  );
}

export default LandingPage;
