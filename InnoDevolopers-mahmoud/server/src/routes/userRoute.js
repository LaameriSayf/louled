const express = require('express');
const { registerUser, signInUser, logout, checkAuth,getUserImageByEmail, verifyEmail , resendVerificationEmail ,fetchUsersByFilters  } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authorisation');
const { compareFaces } = require("../controllers/faceController");
const upload = require('../middlewares/uploadImage');
const router = express.Router();
// 🔹 User Authentication Routes
router.post('/sign-up', upload.single('image'), registerUser);
router.post('/sign-in', signInUser);
router.get('/verify-email/:verificationToken', verifyEmail);
router.post('/resend-verification-email', resendVerificationEmail);
router.get('/view-users', fetchUsersByFilters); 
router.post('/logout', logout);
router.get('/me', authMiddleware(), checkAuth);
// 🔹 Face Recognition Route
router.post("/compare-faces", authMiddleware(),compareFaces);
// 🔹 Fetch User Profile Image by Email
router.get('/profile-image/:email', authMiddleware(), getUserImageByEmail);
module.exports = router;
