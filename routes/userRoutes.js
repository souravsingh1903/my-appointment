const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

console.log("workng 1");
router.post('/add-user', userController.addUser);
console.log("workng 2");

router.get('/get-user', userController.getUsers)
console.log("workng 3");
 
router.delete('/delete-user/:id', userController.deleteUser);
console.log("workng 4");

module.exports = router;