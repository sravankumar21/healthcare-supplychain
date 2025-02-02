import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use navigate

function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
      const { token, role } = response.data; // Assuming role is part of the response
      localStorage.setItem("token", token);
      
      // Navigate based on the user's role
      if (role === "admin") {
        navigate("/dashboard/admin");
      } else if (role === "manufacturer") {
        navigate("/dashboard/manufacturer");
      } else if (role === "distributor") {
        navigate("/dashboard/distributor");
      } else if (role === "pharma") {
        navigate("/dashboard/pharma");
      } else {
        setError("Invalid role or unauthorized access.");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
    setCredentials({ email: "", password: "" });
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", minHeight: "100vh", textAlign: "center" }}>
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
