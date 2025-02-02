import { Container, Typography, Button, Grid, Paper, IconButton, Checkbox, FormControlLabel, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import DashboardImage from "../images/admin.jpg"; // Import an image

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "", role: "" });
  
  useEffect(() => {
    axios.get("http://localhost:5050/api/admin/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const roleIcons = {
    admin: <AdminPanelSettingsIcon />, 
    manufacturer: <BusinessIcon />, 
    distributor: <PersonIcon />, 
    pharma: <PersonIcon />
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(`http://localhost:5050/api/admin/delete/${id}`);
    setUsers(users.filter(user => user._id !== id));
  };

  const handleAddUser = async () => {
    const response = await axios.post("http://localhost:5050/api/admin/add", newUser);
    setUsers([...users, response.data]);
    setShowAddUser(false);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, textAlign: "center" }}>
      <img src={DashboardImage} alt="Admin Dashboard" style={{ marginTop: "80px", width: "70%", maxHeight: "300px", objectFit: "cover" }} />
      <Typography variant="h3" sx={{ marginBottom: 4 }}>Admin Dashboard</Typography>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5">User Management</Typography>
            <Typography>{users.length} Users</Typography>
            <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => setShowUsers(!showUsers)}>Manage Users</Button>
            <Button variant="contained" sx={{ marginTop: 2 }} startIcon={<AddIcon />} onClick={() => setShowAddUser(true)}>Add User</Button>
          </Paper>
        </Grid>
      </Grid>
      {showUsers && (
        <Paper sx={{ padding: 2, marginTop: 2 }}>
          <Typography variant="h5">Users</Typography>
          {users.map((user) => (
            <Paper key={user._id} sx={{ padding: 1, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {roleIcons[user.role]} <Typography>{user.username}</Typography>
              <IconButton onClick={() => handleDeleteUser(user._id)}><DeleteIcon /></IconButton>
            </Paper>
          ))}
        </Paper>
      )}
      <Dialog open={showAddUser} onClose={() => setShowAddUser(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField label="Username" fullWidth margin="dense" onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
          <TextField label="Email" fullWidth margin="dense" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <TextField label="Password" type="password" fullWidth margin="dense" onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
          <FormControlLabel control={<Checkbox onChange={() => setNewUser({ ...newUser, role: "admin" })} />} label="Admin" />
          <FormControlLabel control={<Checkbox onChange={() => setNewUser({ ...newUser, role: "manufacturer" })} />} label="Manufacturer" />
          <FormControlLabel control={<Checkbox onChange={() => setNewUser({ ...newUser, role: "distributor" })} />} label="Distributor" />
          <FormControlLabel control={<Checkbox onChange={() => setNewUser({ ...newUser, role: "pharma" })} />} label="Pharma" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddUser(false)}>Cancel</Button>
          <Button onClick={handleAddUser} variant="contained">Add User</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminDashboard;

// Sample JSON Data and API Requests for Postman Testing
// Get all users: GET http://localhost:5050/api/admin/users
// Add a user: POST http://localhost:5050/api/admin/add
// Body: { "username": "shiva", "email": "shiva@gmail.com", "password": "12345678", "role": "admin" }
// Delete a user: DELETE http://localhost:5050/api/admin/delete/:id