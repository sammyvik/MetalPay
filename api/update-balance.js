const express = require('express');
const app = express();

app.use(express.json());

let users = {
    'user1': { balance: 1500000 },
};

for (let i = 2; i <= 101; i++) {
    users[`user${i}`] = { balance: 0 };
}

app.post('/api/update-balance/:userId', (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;

    if (!users[userId]) {
        return res.status(404).json({ message: 'User not found' });
    }

    users[userId].balance = amount;
    res.json({ message: 'Balance updated successfully' });
});

module.exports = app;
