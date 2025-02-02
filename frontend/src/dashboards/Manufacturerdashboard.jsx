import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import manuimage from '../images/manufacturer.webp';

function ManufacturerDashboard() {
  const [fetchedDistributors, setFetchedDistributors] = useState([]); // State for distributors
  const [fetchedProducts, setFetchedProducts] = useState([]); // State for products
  const [isProductsFetched, setIsProductsFetched] = useState(false); // Track if products have been fetched
  const [isDistributorsVisible, setIsDistributorsVisible] = useState(false); // Toggle distributors visibility
  const navigate = useNavigate();

  // Fetch distributors data when the component mounts
  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/manufacturer/dealers');
        setFetchedDistributors(response.data); // Set the distributors data
      } catch (error) {
        console.error('Error fetching distributors:', error);
      }
    };

    fetchDistributors();
  }, []);

  // Fetch products when "View Products" button is clicked
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/manufacturer/production');
      setFetchedProducts(response.data);
      setIsProductsFetched(true);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle "Manage Distributors" button click to toggle visibility
  const handleManageDistributorsClick = () => {
    setIsDistributorsVisible(!isDistributorsVisible); // Toggle visibility
  };

  // Function to determine card color based on stock availability
  const getCardColor = (quantityAvailable) => {
    return quantityAvailable < 100 ? '#ffcccb' : '#d4edda'; // Light red for < 100 stock, green for >= 100
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 12 }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 4 }}>
        Manufacturer Dashboard
      </Typography>

      <Box sx={{ marginBottom: 4, textAlign: "center" }}>
        <img 
          src={manuimage} 
          alt="Manufacturer"
          style={{ width: "40%", maxHeight: "250px", objectFit: "cover", marginBottom: "10px" }}
        />
      </Box>

      <Grid container spacing={4} sx={{ marginBottom: 4 }}>
        {/* Manage Distributors Button */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center", boxShadow: 3 }}>
            <Typography variant="h5">Manage Distributors</Typography>
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={handleManageDistributorsClick} // Toggle distributors visibility
            >
              {isDistributorsVisible ? "Hide Distributors" : "Show Distributors"}
            </Button>
          </Paper>
        </Grid>

        {/* View Products Button */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center", boxShadow: 3 }}>
            <Typography variant="h5">View Products</Typography>
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={fetchProducts} // Fetch products when clicked
            >
              Fetch Products
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Display Products */}
      {isProductsFetched && (
        <Grid container spacing={4}>
          {fetchedProducts.length > 0 ? (
            fetchedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product._id}>
                <Paper
                  sx={{
                    padding: 2,
                    textAlign: "center",
                    boxShadow: 3,
                    backgroundColor: getCardColor(product.quantityAvailable) // Apply dynamic background color based on stock
                  }}
                >
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    {product.description}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    Price: ₹{product.price}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    Quantity Available: {product.quantityAvailable}
                  </Typography>
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography>No products available</Typography>
            </Grid>
          )}
        </Grid>
      )}

      {/* Display Distributors List only when 'Manage Distributors' is clicked */}
      {isDistributorsVisible && (
        <>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Distributors List
          </Typography>
          <Grid container spacing={4}>
            {fetchedDistributors.length > 0 ? (
              fetchedDistributors.map((distributor) => (
                <Grid item xs={12} sm={6} md={3} key={distributor._id}>
                  <Paper sx={{ padding: 2, textAlign: "center", boxShadow: 3 }}>
                    <Typography variant="h6">{distributor.username}</Typography>
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      Email: {distributor.email}
                    </Typography>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography>No distributors available</Typography>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Container>
  );
}

export default ManufacturerDashboard;
