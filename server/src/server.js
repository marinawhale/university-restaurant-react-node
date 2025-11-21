const express = require('express')
const compression = require('compression')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000;

app.use(compression({
  level: 6,
  threashold: 0
}))

app.get('/ping', (req, res) => {
  res.status(200).send('Server is awake and healthy.');
});

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
  res.set('Cache-Control', 'public, max-age=300, must-revalidate');

    const filePath = path.join(__dirname, 'cardapio', 'cardapio.json');
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})