require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000