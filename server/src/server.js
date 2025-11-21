const express = require('express');
const compression = require('compression');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

let cardapioData = {};
const cardapioFilePath = path.join(__dirname, 'cardapio', 'cardapio.json');

const loadCardapioData = () => {
    try {
        const rawData = fs.readFileSync(cardapioFilePath, 'utf8');
        cardapioData = JSON.parse(rawData);
        console.log('Cardápio recarregado na memória com sucesso.');
        return true;
    } catch (error) {
        console.error('ERRO CRÍTICO: Falha ao carregar/recarregar cardapio.json. Verifique se o arquivo existe e está formatado corretamente.', error);
        return false;
    }
};

loadCardapioData();
app.use(compression({
    level: 6,
    threshold: 0
}));

app.get('/ping', (req, res) => {
    res.status(200).send('Server is awake and healthy.');
});

const allowedOrigins = [
    'https://restaurante-cap-frontend.onrender.com',
    'http://localhost:5173'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Not allowed by CORS: ${origin}`));
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Usar esta rota após rodar o código de conversão e atualizar o cardapio.json no servidor
app.post('/admin/recarregar-dados', (req, res) => {
    if (loadCardapioData()) {
        res.status(200).send('Cardápio recarregado na memória com sucesso. O site foi atualizado para os novos dados.');
    } else {
        res.status(500).send('Falha ao recarregar cardápio. Consulte o console do servidor para detalhes.');
    }
});
app.get('/api/cardapio', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, must-revalidate');

    res.json(cardapioData);
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});