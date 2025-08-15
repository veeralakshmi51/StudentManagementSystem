const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

// JSON Server setup
const apiServer = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
apiServer.use(middlewares);
apiServer.use(router);

// Serve Angular build files
app.use(express.static(path.join(__dirname, 'dist/httpclient')));

// API route
app.use('/api', apiServer);

// Angular fallback for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/httpclient/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
