import React, { useState } from "react";
import { Container, Typography, Button, Grid, Paper, TextField } from "@mui/material";
import { Link } from "react-router-dom";

function PharmaDashboard() {
  const [orderData, setOrderData] = useState({
    productId: "",
    quantity: "",
  });

  const [trackOrderId, setTrackOrderId] = useState("");

  // Handle changes for placing an order
  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle changes for tracking an order
  const handleTrackChange = (e) => {
    setTrackOrderId(e.target.value);
  };

  const isValidOrder = () => {
    return orderData.productId && orderData.quantity > 0;
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 12 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, textAlign: "center" }}>
        Pharma Dashboard
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Place Order Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Place Orders with Distributors
            </Typography>
            <TextField
              label="Product ID"
              fullWidth
              name="productId"
              value={orderData.productId}
              onChange={handleOrderChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Quantity"
              fullWidth
              name="quantity"
              type="number"
              value={orderData.quantity}
              onChange={handleOrderChange}
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              disabled={!isValidOrder()}
            >
              Submit Order
            </Button>
          </Paper>
        </Grid>

        {/* Track Order Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Track Order Status
            </Typography>
            <TextField
              label="Order ID"
              fullWidth
              value={trackOrderId}
              onChange={handleTrackChange}
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              disabled={!trackOrderId}
              component={Link}
              to={`/pharma/track/${trackOrderId}`}
            >
              Track Order
            </Button>
          </Paper>
        </Grid>

        {/* View Inventory Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              View Inventory
            </Typography>
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              component={Link}
              to="/pharma/inventory"
            >
              View Inventory
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PharmaDashboard;
