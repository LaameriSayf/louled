const express = require('express');
const connectDB = require('./db');
const dotenv = require('dotenv');
const userRoutes = require('../routes/userRoute');
const profileRoutes = require('../routes/profileRoute');
const aiRoutes = require('../routes/aiRoutes');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cryptoRoutes = require('../routes/crypto');
const compteBanciareRoutes=require('../routes/compteBancaireRoutes')

const transactionRoutes = require('../routes/transactionRoutes');
const FinancialTransaction = require('../models/FinancialTransaction');
const aiService = require('../services/aiService');
const User = require('../models/user');
const Transaction = require('../models/transaction');
const CoinGeckoService=require('../services/CoinGeckoService')
dotenv.config();
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: "5mb" })); 
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/profile', profileRoutes);
app.use('/stripe', require('../routes/stripe'));
app.use('/transaction', transactionRoutes); // Transaction Routes
app.use('/crypto', cryptoRoutes); // Transaction Routes
app.use('/compteBancaire', compteBanciareRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});