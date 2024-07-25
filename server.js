const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
const PORT = 3000;

// Firebase Admin initialization
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://metal-pay-55c31.firebaseio.com'
});

const db = admin.firestore();

app.use(cors());
app.use(express.json());

// Update balance endpoint
app.post('/update-balance/:userId', async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;

    try {
        // Update balance in Firestore
        await db.collection('users').doc(userId).set({ balance: amount }, { merge: true });
        res.json({ message: 'Balance updated successfully' });
    } catch (error) {
        console.error('Error updating balance:', error);
        res.status(500).json({ message: 'Error updating balance' });
    }
});

// Fetch balance endpoint
app.get('/balance/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch balance from Firestore
        const userDoc = await db.collection('users').doc(userId).get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ balance: userDoc.data().balance });
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ message: 'Error fetching balance' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
