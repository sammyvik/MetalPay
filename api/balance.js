const express = require('express');
const admin = require('../firebase');
const app = express();

app.use(express.json());

let users = {
    'user1': { balance: 1500000 },
};

for (let i = 2; i <= 101; i++) {
    users[`user${i}`] = { balance: 0 };
}

app.get('/api/balance/:userId', async (req, res) => {
    const { userId } = req.params;

    if (!users[userId]) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Get balance from Firestore (optional)
    try {
        const doc = await admin.firestore().collection('users').doc(userId).get();
        if (doc.exists) {
            return res.json({ balance: doc.data().balance });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching balance from Firestore', error });
    }

    res.json({ balance: users[userId].balance });
});

module.exports = app;
