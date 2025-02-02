const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  addUser, 
  updateUser, 
  removeUser, 
  generateOrderReport, 
  generateInventoryReport 
} = require('../controllers/adminController');

// Get all users
router.get('/users', getUsers);


// Add a new user
router.post('/add', addUser);
console.log(addUser); // Should log the function, not undefined


// Update a user
router.put('/update/:id', updateUser);

// Delete a user
router.delete('/delete/:id', removeUser);

// Generate order report
router.get('/orders', generateOrderReport);

// Generate inventory report
router.get('/inventory', generateInventoryReport);

module.exports = router;
