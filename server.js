const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Servir arquivos HTML/CSS/JS

const readJSON = (file) => {
  try { return JSON.parse(fs.readFileSync(`db/${file}.json`, 'utf8')); }
  catch { return []; }
};

const saveJSON = (file, data) => {
  fs.writeFileSync(`db/${file}.json`, JSON.stringify(data, null, 2));
};

// --- Endpoints ---
app.post('/rg', (req, res) => { const rgs = readJSON('rg'); rgs.push(req.body); saveJSON('rg', rgs); res.json({ status:'ok' }); });
app.get('/rg', (req, res) => res.json(readJSON('rg')));

app.post('/placa', (req, res) => { const placas = readJSON('placa'); placas.push(req.body); saveJSON('placa', placas); res.json({ status:'ok' }); });
app.get('/placa', (req, res) => res.json(readJSON('placa')));

app.post('/bo', (req, res) => { const bos = readJSON('bo'); bos.push(req.body); saveJSON('bo', bos); res.json({ status:'ok' }); });
app.get('/bo', (req, res) => res.json(readJSON('bo')));

app.post('/mandado', (req, res) => { const mandados = readJSON('mandados'); mandados.push(req.body); saveJSON('mandados', mandados); res.json({ status:'ok' }); });
app.get('/mandado', (req, res) => res.json(readJSON('mandados')));

app.post('/multa', (req, res) => { const multas = readJSON('multas'); multas.push(req.body); saveJSON('multas', multas); res.json({ status:'ok' }); });
app.get('/multa', (req, res) => res.json(readJSON('multas')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
