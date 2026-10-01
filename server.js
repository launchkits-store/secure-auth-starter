const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'ok', message: 'Secure Auth Starter API' }));
app.post('/api/login', (req, res) => res.json({ token: 'mock-jwt-token-sample' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
