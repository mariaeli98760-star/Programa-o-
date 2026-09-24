server.js
const express = require('express');
const app = express();
app.use(express.json());

let profiles = [];
let technologies = [];
let projects = [];

app.post('/api/profiles', (req, res) => {
  const { nome, email, bio } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e e-mail são obrigatórios' });
  }
  const novo = { id: profiles.length + 1, nome, email, bio };
  profiles.push(novo);
  res.status(201).json(novo);
});

app.get('/api/profiles/:id', (req, res) => {
  const perfil = profiles.find(p => p.id === parseInt(req.params.id));
  if (!perfil) return res.status(404).json({ erro: 'Perfil não encontrado' });
  res.json(perfil);
});

app.post('/api/technologies', (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ erro: 'Nome é obrigatório' });
  const novo = { id: technologies.length + 1, nome };
  technologies.push(novo);
  res.status(201).json(novo);
});

app.get('/api/technologies', (req, res) => {
  res.json(technologies);
});

app.post('/api/projects', (req, res) => {
  const { titulo, descricao, perfilId } = req.body;
  if (!titulo || !perfilId) {
    return res.status(400).json({ erro: 'Título e perfilId são obrigatórios' });
  }
  const novo = { id: projects.length + 1, titulo, descricao, perfilId };
  projects.push(novo);
  res.status(201).json(novo);
});

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

const PORTA = 3000;
app.listen(PORTA, () => console.log(`API rodando na porta ${PORTA}`));
