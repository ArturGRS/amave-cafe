const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Proxy Endpoint to avoid Browser CORS
app.get('/api/menu', async (req, res) => {
  try {
    const MOGO_URL = 'https://app.mogomenu.com.br/Home/GetProductsByEstab?isQrCode=true&urlEmpresa=amavecafe&tipoPedido=3';
    
    // Server-to-server request (no browser CORS block here)
    const response = await fetch(MOGO_URL, {
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error(`MogoMenu responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return res.json(data);
    
  } catch (error) {
    console.error('[Proxy Error] Falha ao buscar menu na MogoMenu:', error.message);
    return res.status(500).json({ error: 'Erro ao conectar à API da MogoMenu' });
  }
});

// Serve frontend assets (index.html, imagens, json etc)
app.use(express.static(path.join(__dirname)));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Amavê Proxy & Web Server rodando na porta ${PORT}`);
});
