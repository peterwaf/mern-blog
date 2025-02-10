const express = require("express");
const router = express.Router();

//middlewares 

const { findUser } = require("../middlewares/findUser");
const { authenticateUser } = require("../middlewares/authenticateUser");


//controllers

const {signUp} = require("../controllers/UserControllers/signUpController");
const {logIn} = require("../controllers/UserControllers/loginController");
const {allUsers} = require("../controllers/UserControllers/allUsersController");
const {getUser} = require("../controllers/UserControllers/getUserController");
const {updateUser} = require("../controllers/UserControllers/updateUserController");
const {deleteUser} = require("../controllers/UserControllers/deleteUserControllers");
const {activateUserEmail} = require("../controllers/UserControllers/activateUserController");


//signup

router.post("/api/v1/signup",signUp);

//login

router.post("/api/v1/login", logIn);

//get all users

router.get("/api/v1/users/all", allUsers);

//get user by id

router.get("/api/v1/users/:id",getUser);

//update user by id

router.patch("/api/v1/users/update/:id", findUser, updateUser);

//delete user by id

router.delete("/api/v1/users/delete/:id", deleteUser);

// activate User by email query

router.patch("/api/v1/users/activate/email", activateUserEmail);





module.exports = router;
