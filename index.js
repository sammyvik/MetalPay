const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Initialize users with 0 balance, and add user1 with a balance of 5000
let users = {
    'user1': { balance: 150000 }, // Example user with non-zero balance
};

// Add 100 users with 0 balance
for (let i = 2; i <= 101; i++) {
    users[`user${i}`] = { balance: 0 };
}

// Update balance endpoint
app.post('/update-balance/:userId', (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;

    if (!users[userId]) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Update balance logic here
    users[userId].balance = amount;
    res.json({ message: 'Balance updated successfully' });
});

// Fetch balance endpoint
app.get('/balance/:userId', (req, res) => {
    const { userId } = req.params;

    if (!users[userId]) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({ balance: users[userId].balance });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
