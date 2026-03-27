require('dotenv').config();
const express = require('express');
const cors = require('cors');
const likesRouter = require('./routes/likes');
const matchesRouter = require('./routes/matches');
const discoveryRouter = require('./routes/discovery');
const messagesRouter = require('./routes/messages');
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'FreeMatch API is running' });
});
app.use('/api/likes', likesRouter);
app.use('/api/matches', matchesRouter);
app.use('/api/discovery', discoveryRouter);
app.use('/api/messages', messagesRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`FreeMatch API running on port ${PORT}`);
});