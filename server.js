const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve arquivos HTML e CSS

// Função auxiliar pra ler JSON
const readJSON = (file) => {
    return JSON.parse(fs.readFileSync(`db/${file}.json`, 'utf8'));
};

// Função auxiliar pra salvar JSON
const saveJSON = (file, data) => {
    fs.writeFileSync(`db/${file}.json`, JSON.stringify(data, null, 2));
};

// Registrar RG
app.post('/rg', (req, res) => {
    const rgs = readJSON('rg');
    rgs.push(req.body);
    saveJSON('rg', rgs);
    res.json({ status: 'ok' });
});

// Consultar RG
app.get('/rg', (req, res) => {
    const rgs = readJSON('rg');
    res.json(rgs);
});

// Outros endpoints: BO, multas, mandados, placa...
// Exemplo BO
app.post('/bo', (req, res) => {
    const bos = readJSON('bo');
    bos.push(req.body);
    saveJSON('bo', bos);
    res.json({ status: 'ok' });
});

app.get('/bo', (req, res) => {
    const bos = readJSON('bo');
    res.json(bos);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
