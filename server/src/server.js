const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(cors({origin: 'http://localhost:5173'}))

app.get('/api/cardapio', (req, res) => {
    const filePath = path.join(__dirname, 'cardapio', 'cardapio.json');
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})