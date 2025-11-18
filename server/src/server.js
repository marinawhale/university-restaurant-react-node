const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    'https://restaurante-cap-frontend.onrender.com',
    'http://localhost:5173'
]

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors({ corsOptions }))

app.get('/api/cardapio', (req, res) => {
    const filePath = path.join(__dirname, 'cardapio', 'cardapio.json');
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})