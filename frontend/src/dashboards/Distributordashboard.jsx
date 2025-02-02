import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Grid, Paper, TextField, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

// Component to place orders
function PlaceOrder() {
  const [orderData, setOrderData] = useState({
    manufacturerId: "",
    pharmaId: "",
    items: [{ productId: "", quantity: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...orderData.items];
    updatedItems[index][name] = value;
    setOrderData({ ...orderData, items: updatedItems });
  };

  const handleAddItem = () => {
    setOrderData({
      ...orderData,
      items: [...orderData.items, { productId: "", quantity: "" }],
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:5050/api/distributor/orders", orderData);
      setLoading(false);
      alert("Order placed successfully");
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      setError("Error placing order");
      console.error(error);
    }
  };

  const isValidOrder = () => {
    // Check if all required fields are filled
    return orderData.manufacturerId && orderData.pharmaId && orderData.items.every(item => item.productId && item.quantity > 0);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Place Order</Typography>
        <Paper sx={{ padding: 3 }}>
          <TextField
            label="Manufacturer ID"
            fullWidth
            value={orderData.manufacturerId}
            onChange={(e) => setOrderData({ ...orderData, manufacturerId: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Pharma ID"
            fullWidth
            value={orderData.pharmaId}
            onChange={(e) => setOrderData({ ...orderData, pharmaId: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          {orderData.items.map((item, index) => (
            <div key={index} style={{ marginBottom: 16 }}>
              <TextField
                label="Product ID"
                name="productId"
                value={item.productId}
                onChange={(e) => handleInputChange(e, index)}
                sx={{ marginRight: 2 }}
              />
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={item.quantity}
                onChange={(e) => handleInputChange(e, index)}
                sx={{ marginRight: 2 }}
              />
            </div>
          ))}
          <Button variant="outlined" onClick={handleAddItem} sx={{ marginBottom: 2 }}>
            Add Item
          </Button>
          <div>
            {error && <Typography color="error">{error}</Typography>}
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!isValidOrder()}
              >
                Submit Order
              </Button>
            )}
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

// Component to manage inventory
function ManageInventory() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    quantityAvailable: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.put("http://localhost:5050/api/distributor/inventory", productData);
      setLoading(false);
      alert("Inventory updated successfully");
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      setError("Error updating inventory");
      console.error(error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Manage Inventory</Typography>
        <Paper sx={{ padding: 3 }}>
          <TextField
            label="Product Name"
            fullWidth
            value={productData.name}
            onChange={(e) => setProductData({ ...productData, name: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            value={productData.description}
            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            value={productData.price}
            onChange={(e) => setProductData({ ...productData, price: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Quantity Available"
            type="number"
            fullWidth
            value={productData.quantityAvailable}
            onChange={(e) => setProductData({ ...productData, quantityAvailable: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <div>
            {error && <Typography color="error">{error}</Typography>}
            {loading ? (
              <CircularProgress />
            ) : (
              <Button variant="contained" onClick={handleSubmit}>
                Update Inventory
              </Button>
            )}
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

// Component to dispatch orders
function DispatchOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5050/api/distributor/dispatch");
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDispatch = async (orderId) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5050/api/distributor/dispatch/${orderId}`);
      alert("Order dispatched successfully");
      setOrders(prevOrders =>
        prevOrders.map(order => (order._id === orderId ? response.data.order : order))
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Error dispatching order");
      console.error(error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Dispatch Orders</Typography>
        <Paper sx={{ padding: 3 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            orders.map((order) => (
              <div key={order._id} style={{ marginBottom: 16 }}>
                <Typography variant="h6">Order Number: {order.orderNumber}</Typography>
                <Button variant="contained" onClick={() => handleDispatch(order._id)}>
                  Dispatch
                </Button>
              </div>
            ))
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

// Distributor Dashboard component
function DistributorDashboard() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 12 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Distributor Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center", height: "120px" }}>
            <Typography variant="h5">Place Orders with Manufacturers</Typography>
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              component={Link}
              to="/distributor/orders"
            >
              Place Orders
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center", height: "120px" }}>
            <Typography variant="h5">Manage Inventory</Typography>
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              component={Link}
              to="/distributor/inventory"
            >
              Manage Inventory
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center", height: "120px" }}>
            <Typography variant="h5">Track and Dispatch Orders</Typography>
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              component={Link}
              to="/distributor/dispatch"
            >
              Dispatch Orders
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DistributorDashboard;
