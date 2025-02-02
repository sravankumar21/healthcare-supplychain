import { AppBar, Toolbar, Typography, Button, IconButton, Avatar } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1976d2", width: "100%" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <MedicalServicesIcon sx={{ fontSize: 32 }} /> {/* Increased icon size */}
        </IconButton>
        <Typography
          variant="h5"
          sx={{ 
            flexGrow: 1, 
            marginLeft: 1, 
            fontFamily: "'Smooch Sans', sans-serif", 
            fontSize: "1.8rem" // Increased font size
          }}
        >
          PHARMACARE
        </Typography>
        <Button 
          color="inherit" 
          component={Link} 
          to="/" 
          sx={{ fontFamily: "'Smooch Sans', sans-serif", fontSize: "1.2rem" }} // Increased font size
        >
          Home
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/services" 
          sx={{ fontFamily: "'Smooch Sans', sans-serif", fontSize: "1.2rem" }}
        >
          Services
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/about" 
          sx={{ fontFamily: "'Smooch Sans', sans-serif", fontSize: "1.2rem" }}
        >
          About
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/contact" 
          sx={{ fontFamily: "'Smooch Sans', sans-serif", fontSize: "1.2rem" }}
        >
          Contact
        </Button>
        <Avatar sx={{ bgcolor: "white", color: "black", marginLeft: 2 }} />
        <Button
          color="inherit"
          onClick={handleAuth}
          component={Link}
          to="/login"
          sx={{ marginLeft: 2, fontFamily: "'Smooch Sans', sans-serif", fontSize: "1.2rem" }}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
