import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import


function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(`Input Changed: ${e.target.name} = ${e.target.value}`);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login request with credentials:", credentials);

    try {
      const response = await axios.post("http://localhost:5050/api/auth/login", credentials);
      console.log("Login response received:", response.data);

      if (response.status === 200) {
        const { token, role } = response.data;
        console.log("Token received:", token);

        let userRole = role; // Default role from response
        if (!userRole) {
          console.warn("Role is missing from API response. Decoding from token...");
          const decodedToken = jwtDecode(token);
          console.log("Decoded Token:", decodedToken);
          userRole = decodedToken.role;
        }

        console.log("User role:", userRole);
        localStorage.setItem("token", token);

        if (userRole === "admin") {
          console.log("Navigating to Admin Dashboard...");
          navigate("/dashboard/admin");
        } else if (userRole === "manufacturer") {
          console.log("Navigating to Manufacturer Dashboard...");
          navigate("/dashboard/manufacturer");
        } else if (userRole === "distributor") {
          console.log("Navigating to Distributor Dashboard...");
          navigate("/dashboard/distributor");
        } else if (userRole === "pharma") {
          console.log("Navigating to Pharma Dashboard...");
          navigate("/dashboard/pharma");
        } else {
          console.log("Invalid role detected.");
          setError("Invalid role or unauthorized access.");
        }
      } else {
        console.log("Unexpected response status:", response.status);
        setError("Unexpected error occurred.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
      }
      setError("Invalid email or password. Please try again.");
    }

    setCredentials({ email: "", password: "" });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
        <Typography variant="h3" sx={{ marginBottom: 2 }}>Login</Typography>
        {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" name="email" type="email" value={credentials.email} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Password" name="password" type="password" value={credentials.password} onChange={handleChange} margin="normal" required />
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>Login</Button>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginPage;
