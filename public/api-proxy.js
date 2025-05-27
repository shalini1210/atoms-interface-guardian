
// Simple proxy server to handle CORS and API requests
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const API_BASE_URL = 'https://atoms-api.smallest.ai/api/v1';

// Proxy endpoint for user data
app.get('/api/proxy/user', async (req, res) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'GET',
      headers: {
        'Authorization': req.headers.authorization,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy server error' });
  }
});

// Proxy endpoint for conversation data
app.get('/api/proxy/conversation/:id', async (req, res) => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversation/${req.params.id}`, {
      method: 'GET',
      headers: {
        'Authorization': req.headers.authorization,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
