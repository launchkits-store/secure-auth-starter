const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Mock user database
const users = [];

// Register route (using simple password storage for zero-dependency starter)
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        users.push({ username, password, role: role || 'user' });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login route with JWT issuance
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ accessToken: token });
});

app.listen(PORT, () => {
    console.log(`Secure Auth Starter running on port ${PORT}`);
});
