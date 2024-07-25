cat <<EOF >index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let users = {
    'user1': { balance: 150000 },
};

for (let i = 2; i <= 101; i++) {
    users[\`user\${i}\`] = { balance: 0 };
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

app.get('/api/balance/:userId', (req, res) => {
    const { userId } = req.params;

    if (!users[userId]) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({ balance: users[userId].balance });
});

app.listen(PORT, () => {
    console.log(\`Server is running on http://localhost:\${PORT}\`);
});
EOF

